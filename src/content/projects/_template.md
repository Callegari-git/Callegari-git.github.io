---
# Authoring guide: this file is ignored by the collection (filename starts with "_").
# To add a project: copy this file to <slug>.md, fill it in, done.
title: Project title
slug: project-slug # must match the filename
summary: One or two sentences: the problem and what shipped.
category: Short category · Optional second part
date: 2026-01-01 # start
end: 2026-06-30 # omit for "present"
role: Your role, Company
status: production # production | prototype | ongoing
# statusConfirm: '[CONFIRM: …]' # shown instead of the status badge
# team: Team of N · what I led # team projects only; also add a "My part" section
# confirm: ['[CONFIRM: …]'] # notes shown under the header
# advisor: Prof. Name # school projects
featured: false # true = card in "Featured projects"
order: 99 # sort order (home + previous/next)
# page: false # card only, no case-study page
stack: [Python]
metrics: # the first one is the card's highlight
  - value: '123'
    label: what the number measures
  # estimated: true # shows an "est." tag
links: {} # project / slides / demo / repo: a URL or '[CONFIRM: …]'
---

## Problem

## Approach

## My part

Team projects only.

## Architecture

<!-- Replace this text flow with a draw.io diagram: create src/assets/diagrams/<slug>.drawio,
run `npm run diagrams`, then use ![Full flow described in words](../../assets/diagrams/<slug>.svg). -->

```text
input → step → step → output
```

## Results

## Limits
