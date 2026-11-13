---
title: Automating operations of a multinational EV charging network
slug: ev-network-automation
summary: Turned manual, high-volume operations on a fleet of tens of thousands of chargers into audited, resumable pipelines.
category: Production automation · APIs
date: 2026-03-01
end: 2026-08-31
role: Software Automation Engineer Intern, TotalEnergies Charging Services
status: production
featured: true
order: 2
stack:
  - Python
  - REST APIs
  - Databricks
  - PySpark
  - FastAPI
metrics:
  - value: '15,000+'
    label: config changes on ~4,000 EVSEs / 1,000+ chargers
  - value: '< 1 month'
    label: for that campaign, vs ~4 months manual (est.)
  - value: '~10,000'
    label: chargers migrated across 5 operators, scripts built in 2 weeks
  - value: '~4 months'
    label: of manual work avoided on that migration
    estimated: true
  - value: '600,000+'
    label: helpdesk tickets unarchived and converted, external vendor avoided
  - value: '150+'
    label: tariff grids updated in 2 days of dev
---

## Problem

TotalEnergies Charging Services, Products department, La Défense: a transverse role created to test whether a
dedicated automation function pays off, mentored by a solutions architect.

The fleet was doubling. Configuration, migrations, pricing and incident handling were still done by hand on
thousands of devices, with high error risk.

## Approach

A 10-step protocol for every automation:

- Decompose the manual process; separate actions, human decisions and checks.
- Test on a sample, get user validation, then roll out in stages.
- Pre-checks before every action, per-object logging, and selective replay of what failed.

## Architecture

```text
manual process → actions / human decisions / checks → pre-checks → sample run → user validation
              → staged rollout → per-object audit log → selective replay of failures
```

## Results

Volumes are measured. Time savings marked "est." are estimated from team-declared unit times.

- HPC network campaign: **15,000+ config changes**, ~4,000 EVSEs / 1,000+ chargers, done in **< 1 month vs ~4
  months** (est.).
- Joint-venture migration: **~10,000 chargers, 5 operators**, scripts in **2 weeks**, ~4 months of manual work
  avoided (est.).
- Helpdesk migration: **600,000+ tickets** unarchived via API and converted from XML, **< 1 week** of dev, external
  vendor avoided.
- Pricing: an eMSP added to **150+ tariff grids** in **2 days** of dev (weeks of manual work avoided).
- Card-terminal reconciliation: several thousand euros of unmatched transactions found in 2 days.
