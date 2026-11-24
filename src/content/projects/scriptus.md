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
  - Temporal
  - AWS
  - Docker
  - Pydantic
  - REST APIs
metrics:
  - value: 'Hundreds'
    label: charging sites provisioned in production, each from one Excel file in minutes — vs several months by hand (est.)
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

One Excel file describes the whole site. The service validates it, then a **Temporal** workflow runs the dependent
API calls in order (retries and step state handled by Temporal) until the site is live in production.

![Architecture: one Excel file describing the whole site goes to Scriptus, a FastAPI service on AWS in Docker that validates the whole payload with Pydantic. A Temporal workflow then creates locations, stations, charge points and roaming partners in order through the platform production API, checking the response after each step. The site goes live when all steps pass; otherwise the run stops at the failing step with a clear error.](../../assets/diagrams/scriptus.svg)

Deployment: Docker container on AWS, connected to Temporal and to the platform's production API.

## Results

Time savings marked "est." are estimated from team-declared unit times.

- Bringing a full charging infrastructure live by hand took **several months** (est.); with Scriptus it is **one
  Excel file and a few minutes** of automated run.
- **Several hundred sites** provisioned in production during the internship alone (Mar–Aug 2026).
