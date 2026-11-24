---
title: Reference configurations from 61,000 chargers
slug: ocpp-reference-templates
summary: Mined fleet configuration data to generate a reference OCPP template per charger model and firmware.
category: Data engineering
date: 2026-03-01
end: 2026-08-31
role: Software Automation Engineer Intern, TotalEnergies Charging Services
status: production
featured: false
order: 4
stack:
  - Databricks
  - PySpark
  - Python
metrics:
  - value: '61,000'
    label: in-service EVSEs mined to build firmware-level reference configs
  - value: '13,768'
    label: distinct parameters across ~175 charger models
  - value: '4'
    label: 'tiers: common, majority, frequent, optional'
---

## Problem

87,374 EVSEs, 13,768 distinct parameters, 177,826 distinct values, ~175 charger models, and no trustworthy
"expected configuration" to compare a device against.

## Approach

- Scope to ~61,000 in-service EVSEs; latest-snapshot join to model and firmware.
- Normalize values (booleans, blanks, whitespace).
- Exclude serial-like or sparse parameters, with an audit reason for each.
- Frequency-based value selection into 4 tiers: COMMON / MAJORITY / FREQUENT / OPTIONAL.

## Architecture

![Architecture on Databricks / PySpark: fleet config snapshots (87,374 EVSEs), scoped to ~61,000 in-service EVSEs and joined on the latest snapshot to model and firmware; values normalized; serial-like or sparse parameters excluded with an audit reason for each; frequency-based selection into 4 tiers (COMMON, MAJORITY, FREQUENT, OPTIONAL); output: one reference template per charger model and firmware.](../../assets/diagrams/ocpp-reference-templates.svg)

## Results

- A reproducible, traceable reference per firmware, replacing a long manual analysis.
- A baseline for expected-vs-actual checks before configuration campaigns.
