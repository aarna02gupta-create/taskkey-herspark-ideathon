# 🔑 Taskey

**Task-scoped, time-bound access delegation for small business owners.**
Hand off one task without handing over your whole account.

> Frontend prototype built for **HerSpark Ideathon 2026** (TCET). Runs on mock data. No backend yet.

<!-- Add a screenshot or GIF here, e.g. ![Taskey dashboard](docs/dashboard.png) -->

---

## The Problem

Small online sellers, many of them women running solo or small stores, often need help with a single job, like marking five orders as dispatched by 6 PM. Sharing a full login is a common shortcut; broad staff roles can also expose more access than the individual task needs. That gives the helper access to refunds, payments and customer data they never needed, and the access stays open long after the task is done.

## The Solution

Taskey lets an owner delegate **one task** with **only the permissions that task needs**.

1. The owner describes the task in plain English.
2. The system proposes a minimal permission scope (least privilege).
3. The owner reviews, edits and approves it.
4. The helper gets access limited to that task, with a timer.
5. Every action is logged, and access expires automatically or can be revoked instantly.

## Prototype Features

- **Guided task creation flow:** describe the task, review the suggested scope, set a duration, confirm
- **Permission diff view:** clearly shows what is allowed (green) and what is blocked (red)
- **Exposure meter:** shows how much of the store is exposed, before and after scoping
- **Split-screen sandbox:** owner view and helper view side by side, sharing one audit log
- **Denied-action alerts:** the helper is blocked when they try something outside the task
- **Countdown and auto-expiry:** no lingering access
- **Revoke / kill switch:** the owner can end a session at any moment
- **Audit trail:** a timestamped log of allowed and denied actions
- **Developer payload view:** the JSON policy behind each delegation
- **Light and dark theme**

## Tech Stack

| Layer | Used in prototype |
|-------|-------------------|
| Frontend | React 19, Vite |
| Icons / effects | lucide-react, canvas-confetti |
| Styling | CSS (custom theme) |
| Data | Mock data (`src/data/mockData.js`) |
| Linting | Oxlint |

## Run Locally

Use **Node.js 20.19+ or 22.12+**, as required by the committed Vite dependency.

```bash
git clone https://github.com/aarna02gupta-create/taskkey-herspark-ideathon.git
cd taskkey-herspark-ideathon
npm ci
npm run dev
```

Then open the local URL shown in the terminal (usually `http://localhost:5173`).

## Source map

- `src/App.jsx`: application navigation and shared state
- `src/components/screens/`: owner, helper, delegation, team, and audit screens
- `src/components/`: task creation, guided tour, and sandbox components
- `src/data/mockData.js`: demo records
- `src/index.css` and `src/styles/theme.css`: styles and theme

Use the committed lockfile with `npm ci`. Run lint and a production build before pushing changes; `npm run preview` lets you check the built app. No API credentials or database are needed for this prototype.

## Demo walkthrough

1. Open the guided task creation flow and use the pre-filled dispatch task.
2. Inspect the allowed/blocked permission comparison and select an access duration.
3. Open the split-screen sandbox and dispatch an assigned order.
4. Attempt a refund or customer export to see a simulated denial and audit entry.
5. Use the owner revoke action to terminate the simulated helper session.
6. Inspect the developer payload to view the example policy JSON.

## Build and code checks

```bash
npm run build
npm run lint
npm run preview
```

`lint` fails on warnings as well as errors, so unused code and hook issues cannot silently accumulate. `preview` serves the production build locally after `build` completes.

## What the prototype demonstrates

The interface uses React state and mock records to demonstrate delegation. The policy JSON is a static example, and text such as "cryptographically signed" or "API gateway" in the UI illustrates the proposed backend design. This repository does not implement cryptographic signing, a gateway, live AI scope generation, or server-side access control.

Exposure percentages and risk labels are illustrative demo values, not measured reductions in security risk. Audit events and simulated session changes are not durable server-side records.

## Project Status and Roadmap

**Current:** UI/UX prototype demonstrating the full delegation flow. The AI scope suggestion, token issuing and enforcement are simulated with mock data.

**Planned:**
- Spring Boot backend with real policy enforcement
- PostgreSQL for delegations and audit logs
- LLM API for turning plain-English tasks into permission scopes
- Real token expiry and revocation

## Team

Team project built for HerSpark Ideathon 2026 at TCET. This repository holds the frontend prototype of our idea, and is maintained by Aarna Gupta.
