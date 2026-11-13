---
title: 'Physical Loop: agentic physical engineering'
slug: physical-loop
summary: An AI design agent that goes from a text request to a printable object with a circuit inside — and a safety and verification layer that keeps it from touching hardware unchecked.
category: Agentic AI · Hardware-in-the-loop
date: 2026-09-01
role: AI Engineer, UC Berkeley MEng industry capstone with Celedon
status: ongoing
team: Team of 4 · I led object design, circuit tools and printer safety
confirm:
  - "[CONFIRM: NDA scope — the capstone listing requires an NDA; check what beyond the partner's name can be public (details, repo, slides)]"
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
  - value: '~12 min'
    label: 'text request to a checked, printable object with a circuit inside (~$6 model cost) [CONFIRM: live run]'
  - value: '16/16'
    label: wiring and worst-case checks passed on the desk-lamp circuit
  - value: '≤ 0.007'
    label: validation NRMSE vs 0.02 threshold (simulated bench)
  - value: '299.9 s'
    label: dead-man timer kill, measured on a real CR-10 V2
links:
  repo: '[CONFIRM: public or private?]'
  slides: '[CONFIRM: OK to link?]'
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
- Full object run ("a desk lamp"): **~12 minutes, ~$6 of model cost**, with per-stage cost caps and tool-call limits.
  The circuit passes all 16 wiring and worst-case checks; 4 printed parts, wires routed, human approval, assembly
  guide written. [CONFIRM: link the live run record that gives 12 min / $6]
- Agent-written CadQuery code runs in a sandboxed process with static checks and timeouts; specs frozen by SHA-256.
- 1,100+ automated tests across the repo (team), CI on every pull request.

## Limits

The experiment bench is simulated. The live-LLM end-to-end run and bench measurement of a built object are next
steps.
