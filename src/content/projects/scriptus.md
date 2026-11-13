---
title: 'Scriptus: one API call to create a full charging site'
slug: scriptus
summary: FastAPI microservice on AWS, integrated with the platform's production API, that provisions a complete charging site (locations, stations, charge points, roaming partners) from a single Excel input, orchestrating dependent API calls with Temporal workflows.
category: Backend · Production service
date: 2026-03-01
end: 2026-08-31
role: Software Automation Engineer Intern, TotalEnergies Charging Services
status: production
featured: true
order: 3
stack:
  - Python
  - FastAPI
  - Pydantic
  - Temporal
  - REST APIs
  - 'AWS [CONFIRM services]'
  - 'Docker [CONFIRM]'
metrics: []
---

## Problem

Creating an HPC site meant many manual steps in a strict order, each depending on the ID returned by the previous
one. One mistake left half-built objects in the platform.

## Approach

- A single entry point.
- Pydantic validation of the whole payload before any call.
- Orchestrated, dependency-ordered API calls, with response checks between steps.
- Stop at the exact failing step with a clear error, instead of continuing on an incomplete object.

## Architecture

```text
Excel input → Pydantic validation (whole payload) → Temporal workflow
            → dependency-ordered API calls (locations, stations, charge points, roaming partners)
            → response check after each step → stop at the failing step with a clear error
```

Deployment: [CONFIRM details: AWS service (ECS/Fargate, Lambda + API Gateway, EC2…), containerized?, CI/CD, auth, secrets,
logging/monitoring, environments (staging/prod)]

## Results

[CONFIRM numbers: sites created since go-live, time per site before → after, failure/retry rate, latency, users (which teams
call it), uptime]
