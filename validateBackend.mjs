/**
 * validateBackend.mjs
 * Lightweight smoke-test for the Q-Grid Sentinel backend logic.
 * Run with: node validateBackend.mjs
 *
 * No test framework needed — pure console output.
 */

import {
  createInitialState,
  stateUpdateUsage,
  stateApplySpecialRequest,
  stateActivateRequest,
  stateAddCustomer,
  stateRemoveCustomer,
  getOverloadedRegions,
  hasOverload,
  runOptimization,
  snapshotState,
  compareSnapshots,
  buildBeforeAfterFromResult,
} from "./src/engine/index.js";

import { runQAOAOptimization } from "./src/engine/qaoaEngine.js";

// ─── HELPERS ────────────────────────────────────────────────────────────────

let passed = 0;
let failed = 0;

function assert(label, condition, detail = "") {
  if (condition) {
    console.log(`  ✅ ${label}`);
    passed++;
  } else {
    console.error(`  ❌ ${label}${detail ? " — " + detail : ""}`);
    failed++;
  }
}

function section(title) {
  console.log(`\n${"─".repeat(60)}`);
  console.log(`  ${title}`);
  console.log("─".repeat(60));
}

// ─── TESTS ───────────────────────────────────────────────────────────────────

section("1. Initial State");
const state0 = createInitialState();
assert("Has customers array",   Array.isArray(state0.customers));
assert("Has regions array",     Array.isArray(state0.regions));
assert("Has metrics object",    typeof state0.metrics === "object");
assert("Has requests array",    Array.isArray(state0.requests));
assert("Customers count ≥ 1",   state0.customers.length >= 1);
assert("Regions count === 4",   state0.regions.length === 4);
assert("Metrics.efficiency > 0", state0.metrics.efficiency > 0);

section("2. Region Load Calculation");
const northRegion = state0.regions.find((r) => r.region === "North");
assert("North region exists",         !!northRegion);
assert("North currentLoad > 0",       northRegion.currentLoad > 0);
assert("North status is a string",    typeof northRegion.status === "string");
assert("North loadPercent is defined", northRegion.loadPercent !== undefined);
console.log(`     North: ${northRegion.currentLoad.toLocaleString()} W / ${northRegion.totalCapacity.toLocaleString()} W (${northRegion.loadPercent}%) → ${northRegion.status}`);

section("3. Overload Detection");
const overloaded = getOverloadedRegions(state0);
console.log(`     Overloaded regions: ${overloaded.map((r) => r.region).join(", ") || "none"}`);
assert("hasOverload() returns boolean", typeof hasOverload(state0) === "boolean");

section("4. Metrics Engine");
const m = state0.metrics;
assert("efficiency in 0–100",           m.efficiency >= 0 && m.efficiency <= 100);
assert("blackoutRisk in 0–10",          m.blackoutRisk >= 0 && m.blackoutRisk <= 10);
assert("renewableUtilization ≥ 0",      m.renewableUtilization >= 0);
assert("totalPowerDistributed > 0",     m.totalPowerDistributed > 0);
assert("priorityCustomers ≥ 0",         m.priorityCustomers >= 0);
console.log(`     Efficiency: ${m.efficiency}% | Blackout Risk: ${m.blackoutRisk}/10 | Renewable: ${m.renewableUtilization}%`);

section("5. Customer — updateUsage");
const cust1 = state0.customers[0];
const state1 = stateUpdateUsage(state0, cust1.id, 500_000);
const updatedCust = state1.customers.find((c) => c.id === cust1.id);
assert("Usage updated correctly", updatedCust.currentUsage === 500_000);
assert("Regions recomputed",      state1.regions[0].currentLoad !== state0.regions[0].currentLoad);

section("6. Customer — applySpecialRequest");
const state2 = stateApplySpecialRequest(state0, cust1.id, 40, "2 hours");
const boostedCust = state2.customers.find((c) => c.id === cust1.id);
assert("specialRequest = true",          boostedCust.specialRequest === true);
assert("tempBoostPercent = 40",          boostedCust.tempBoostPercent === 40);
assert("tempRequestDuration = '2 hours'", boostedCust.tempRequestDuration === "2 hours");
assert("status = Critical",              boostedCust.status === "Critical");

section("7. Customer — add & remove");
const state3 = stateAddCustomer(state0, { name: "Test Corp", region: "West", currentUsage: 200_000 });
assert("Customer added",          state3.customers.length === state0.customers.length + 1);
const newCust = state3.customers[state3.customers.length - 1];
const state4 = stateRemoveCustomer(state3, newCust.id);
assert("Customer removed",        state4.customers.length === state0.customers.length);

section("8. Request — activate");
const reqWithActive = state0.requests.find((r) => r.active);
if (reqWithActive) {
  const state5 = stateActivateRequest(state0, reqWithActive.id);
  const cAfter = state5.customers.find((c) => c.name === reqWithActive.customer);
  assert("Request activation — customer boosted", cAfter?.specialRequest === true);
}

section("9. QAOA Optimisation Engine");
console.log("  Running simulated QAOA...");
const beforeSnap = snapshotState(state0);
const optState   = runOptimization(state0);
const afterSnap  = snapshotState(optState);

assert("optimizationStatus = complete",       optState.optimizationStatus === "complete");
assert("lastResult exists",                   !!optState.lastResult);
assert("lastResult.before exists",            !!optState.lastResult.before);
assert("lastResult.after exists",             !!optState.lastResult.after);
assert("lastResult.quantumMeta.algorithm",    optState.lastResult.quantumMeta.algorithm === "QAOA");
assert("lastResult.quantumMeta.qubitsUsed",   optState.lastResult.quantumMeta.qubitsUsed === 24);
assert("quantumMeta.convergence > 0",         optState.lastResult.quantumMeta.convergence > 0);
assert("log is non-empty array",              Array.isArray(optState.lastResult.log) && optState.lastResult.log.length > 0);

const diff = compareSnapshots(beforeSnap, afterSnap);
console.log(`     Efficiency Δ: ${diff.efficiencyDelta > 0 ? "+" : ""}${diff.efficiencyDelta}%`);
console.log(`     Blackout Risk Δ: ${diff.blackoutRiskDelta}`);
console.log(`     Overloaded Regions Δ: ${diff.overloadedDelta}`);

section("10. Before/After Snapshot");
const baf = buildBeforeAfterFromResult(optState.lastResult);
assert("before.metrics exists",     !!baf.before.metrics);
assert("after.metrics exists",      !!baf.after.metrics);
assert("summary.efficiencyGain",    typeof baf.summary.efficiencyGain === "number");
assert("summary.regionsHealed ≥ 0", baf.summary.regionsHealed >= 0);
assert("quantumMeta present",       !!baf.quantumMeta);
assert("generatedAt present",       !!baf.generatedAt);

// ─── SUMMARY ─────────────────────────────────────────────────────────────────

console.log(`\n${"═".repeat(60)}`);
console.log(`  RESULTS: ${passed} passed | ${failed} failed`);
console.log("═".repeat(60));
if (failed === 0) {
  console.log("  🎉 All backend logic tests passed!\n");
} else {
  console.log("  ⚠️  Some tests failed — check output above.\n");
  process.exit(1);
}
