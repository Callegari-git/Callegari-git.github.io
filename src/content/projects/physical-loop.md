---
title: 'Physical Loop: agentic physical engineering'
slug: physical-loop
summary: An AI design agent that goes from a text request to a printable object with a circuit inside — and a safety and verification layer that keeps it from touching hardware unchecked.
category: Agentic AI · Hardware-in-the-loop
date: 2026-09-01
role: AI Engineer, UC Berkeley MEng industry capstone with Celedon (DaVinci platform)
status: ongoing
team: Team of 4 · I led object design, circuit tools and printer safety
advisor: Prof. Kosa Goucher-Lambert
featured: true
order: 1
stack:
  - Python
  - MCP
  - Pydantic
  - CadQuery
  - PrusaSlicer
  - Marlin G-code
  - NumPy/SciPy
  - pytest
  - GitHub Actions
  - Claude Code
metrics:
  - value: '11.5 min'
    label: text request to a checked, printable object with a circuit inside — $6.05 of model cost
  - value: '4'
    label: agent tool calls refused by the guardrails during the live desk-lamp run
  - value: '~13 min'
    label: first agent-driven print on a real CR-10 V2 (supervised mode)
  - value: '≤ 0.007'
    label: validation NRMSE vs 0.02 threshold (simulated bench)
  - value: '299.9 s'
    label: dead-man timer kill, measured on a real CR-10 V2
links:
  project: https://celedon.solutions/
  slides: https://capstone-slides-lake.vercel.app/
  repo: '[CONFIRM: is the repo public? Linked only once it is]'
---

## Problem

AI design tools generate models and CAD fast but cannot touch the bench. Checking them against real instruments is
manual, and an agent allowed to drive a 3D printer or a power supply is a safety risk.

## Approach

Team design: an experiment loop where an agent picks trials over MCP, software runs them, fits a model, freezes it,
and an independent verifier rescores predictions from raw files. Validation data stays hidden until the candidate is
frozen.

## My part

77 commits, from the git history.

- **Object design pipeline:** one request → circuit from a closed component catalog → parts and housing around real
  component envelopes → one human y/n → build, `check_housing`, assembly guide and 3D mock-up.
- **Circuit tools:** netlist and wiring checks (ERC), worst-case DC analysis (LED current and power, resistor power,
  supply limits, battery runtime), BOM, bench predictions, MCP server.
- **Assembly tools:** multi-part spec with peg joints and wire channels, exact fit checks on STEP files, print plan
  ordered by part.
- **Printer safety:** simulated safety gates (signed single-use approvals bound to the exact file, limits, G-code
  pre-flight, hash-chained audit log, separate heater watchdog), then a **supervised Marlin mode on a real Creality
  CR-10 V2** (port lock, dead-man timer with host keepalive — kill proven at 299.9 s).
- Slicer pipeline (pinned PrusaSlicer profile), blind model/slice reviewers, push-to-talk voice front end.

## Architecture

```text
Agent ⇄ MCP (campaign tools only) ⇄ services / executor ⇄ backend (simulated RC bench or printer)
                                                              │
                                                              ▼
                              traces → fit → frozen candidate → independent verifier

Rule: MCP never talks to the bench; the hardware layer never talks to the agent.
```

## Results

- Reference loop on a simulated RC bench: model corrected from τ = 0.5 s to 1.0006 s (true value 1.0 s); validation
  NRMSE 0.0067 and 0.0041 vs a 0.02 threshold; verdict recomputed independently.
- Live object run ("a desk lamp", 2026-10-28, Claude Opus 5.5): **11.5 minutes, $6.05 of model cost** against a $35
  run cap, with per-stage caps ($1 / $3 / $10 / $20). All 4 parts passed their geometry check on the first build;
  `check_housing` passes (assembly fit, wire lengths, circuit re-check); **4 agent tool calls refused** by the
  guardrails in the mechanics stage. Record: `artifacts/object-runs/20261028-192434-a-desk-lamp/report.md`.
- **First agent-driven print on the real CR-10 V2** (2026-10-28, supervised mode): part printed in ~13 min, one
  approval correctly declined on a mistyped confirmation code, no gate refusal, hash-chained audit log verified
  intact. Record: `docs/runs/2026-10-28-first-agent-print.md`. [CONFIRM: measure the two 4.0 mm holes with
  calipers — the record still says TODO]
- Agent-written CadQuery code runs in a sandboxed process with static checks and timeouts; specs frozen by SHA-256.
- 1,100+ automated tests across the repo (team), CI on every pull request.

## Limits

- The model-calibration loop runs on a simulated RC bench.
- The object with a circuit has been designed and checked, but not yet built and measured at the bench (next
  milestone).
- The first real print was a simple test plate.
