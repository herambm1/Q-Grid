# ⚡ Q-Grid Sentinel — README

## Hybrid Quantum-Classical Smart Grid Optimization Platform

Q-Grid Sentinel is a smart-grid optimization platform designed to simulate and demonstrate how hybrid quantum-classical optimization can improve energy distribution efficiency in modern infrastructure systems.

The platform includes:

* smart-grid monitoring
* overload detection
* customer prioritization
* regional balancing
* special request handling
* hybrid quantum optimization comparison engine
* QAOA-inspired optimization workflows

---

# 🚀 Features

## ✅ Smart Grid Dashboard

* Live energy metrics
* Regional load balancing
* Customer monitoring
* Overload visualization

---

## ✅ Hybrid Quantum Comparison Engine

Compare:

* Classical Optimization
* Hybrid Quantum Optimization

using:

* optimization time
* resource usage
* energy redistribution cost
* overload reduction
* scalability graphs

---

## ✅ Smart Grid Regional Map

* Region status visualization
* Energy flow simulation
* Overloaded node detection
* Dynamic balancing visualization

---

## ✅ Customer & Region Management

* Add/Edit Customers
* Add Regions
* Priority classification
* Temporary high-demand requests

---

## ✅ QAOA Optimization Simulation

The platform demonstrates:

* constrained optimization
* combinatorial allocation balancing
* hybrid quantum-classical workflows

using:

* QAOA-inspired optimization behavior
* simulated scalability comparison

---

# 🧠 Quantum Computing Role

Quantum computing is used ONLY for:

# optimization problems

NOT:

* dashboards
* UI
* analytics
* authentication
* visualization

The project demonstrates how:

* classical AI handles forecasting
* hybrid quantum optimization handles complex redistribution decisions

---

# ⚛️ Why QAOA?

QAOA (Quantum Approximate Optimization Algorithm) is designed for:

* graph optimization
* scheduling
* routing
* constrained allocation problems

Smart-grid balancing naturally becomes:

# a combinatorial optimization problem

where:

* multiple regions compete for limited energy
* overload constraints exist
* priority customers must be preserved
* redistribution cost must be minimized

---

# 🏗️ Tech Stack

## Frontend

* React
* Vite
* TailwindCSS
* Recharts
* Framer Motion

---

## Backend

* Node.js
* Express.js

---

## Quantum Layer

* QAOA-inspired optimization simulation
* scalable comparison engine
* future-ready Qiskit integration

---

# 📁 Project Structure

```txt
Q-Grid/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   ├── assets/
│   ├── data/
│   ├── logic/
│   ├── state/
│   ├── utils/
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│
├── public/
│
├── package.json
```

---

# ⚙️ Prerequisites

Install:

## 1. Node.js

Download:
https://nodejs.org/

Recommended:

```txt
Node.js LTS
```

---

## 2. NVM (Optional but Recommended)

NVM helps manage Node versions.

---

# 🛠️ Installing NVM

## Windows

Download:
https://github.com/coreybutler/nvm-windows/releases

Install:

```txt
nvm-setup.exe
```

---

## Verify Installation

Open terminal:

```bash
nvm version
```

---

# 📦 Install Node Using NVM

```bash
nvm install 20
```

Then:

```bash
nvm use 20
```

Verify:

```bash
node -v
```

---

# 📥 Project Setup

## 1. Open Terminal

Inside project folder:

```bash
cd Q-Grid
```

---

# 📦 Install Dependencies

```bash
npm install
```

This installs:

* React
* Vite
* Tailwind
* charts
* animations
* backend packages

---

# ▶️ Run Frontend

```bash
npm run dev
```

Terminal output:

```txt
Local: http://localhost:5173
```

Open:

```txt
http://localhost:5173
```

---

# ▶️ Run Backend

Open SECOND terminal.

Navigate:

```bash
cd backend
```

Install backend packages:

```bash
npm install
```

Run backend:

```bash
node server.js
```

OR

```bash
npm start
```

Backend runs on:

```txt
http://localhost:5000
```

---

# 🔗 Frontend + Backend Connection

Frontend should call backend APIs like:

```txt
GET /comparison/15
GET /comparison/graph/time
GET /comparison/qaoa
```

---

# 📊 Comparison Engine Demo

## Demo Flow

1. Open Comparison Engine
2. Increase node scale:

```txt
5 → 10 → 15 → 20
```

3. Trigger overload scenario
4. Run Classical Optimization
5. Observe:

* higher cost
* more overloads
* slower scaling

6. Run Hybrid Quantum Optimization
7. Observe:

* improved balancing
* fewer overloads
* lower redistribution cost
* stable scaling

---

# 📌 Important Technical Note

This project demonstrates:

# hybrid quantum optimization concepts

using:

* QAOA-inspired optimization simulation
* combinatorial balancing logic
* scalability visualization

This is NOT:

* real quantum hardware acceleration
* fault-tolerant quantum computing
* production smart-grid deployment

---

# 🧠 Key Technical Narrative

“We use classical AI for forecasting and anomaly detection, while hybrid quantum optimization is applied to the exponentially complex redistribution problem.”

---

# 🎯 Hackathon Objective

The goal of this project is to demonstrate:

* scalable smart-grid optimization
* hybrid quantum-classical workflows
* intelligent infrastructure balancing
* and future-ready optimization architectures

for sustainable smart-city systems.

---

# 👨‍💻 Team Workflow

## Backend Responsibilities

* overload engine
* optimization logic
* QAOA workflows
* state management
* metrics generation

---

## Frontend Responsibilities

* dashboard UI
* maps
* charts
* comparison engine
* onboarding
* interactions
* visualization

---

# 🚀 Future Improvements

Possible future integrations:

* IBM Qiskit
* real QUBO optimization
* IoT smart-grid telemetry
* AI demand forecasting
* reinforcement learning
* live energy simulation
* real-time infrastructure balancing

---

# 🏁 Final Vision

Q-Grid Sentinel aims to demonstrate how:

# hybrid quantum-classical optimization

could support the next generation of:

* smart cities
* sustainable infrastructure
* and intelligent energy management systems.

```
```






# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
