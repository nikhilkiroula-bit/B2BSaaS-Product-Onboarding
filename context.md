# Project Context: SaaS Onboarding Assistant

## Purpose

Build a portfolio-quality, responsive web experience that helps enterprise customers and their SaaS provider teams coordinate product onboarding in one clear workspace. This file is working context for implementation in VS Code; the canonical product requirements and acceptance criteria are in [`PRD.md`](PRD.md).

## Product in One Sentence

A shared onboarding workspace that tells an Enterprise IT Administrator what is required, who owns each step, what is blocked, and what to do next.

## Problem

Enterprise onboarding is spread across documents, demos, webinars, technical conversations, and internal approval processes. Customers have difficulty finding relevant prerequisites and coordinating security, network, compliance, and infrastructure teams. Provider-side teams can repeat conversations or provide inconsistent guidance. This manual coordination delays product adoption and makes the experience frustrating.

## Primary User

**Enterprise IT Administrator / System Administrator**: evaluates and prepares the technical environment, coordinates internal approvals, and needs one dependable view of onboarding requirements and progress.

Related participants include customer security, compliance, network, infrastructure, and product teams, plus provider-side Customer Success, Solutions Architecture, Support, and Security teams.

## MVP Outcome

A user can open an onboarding workspace and quickly answer:

1. What stage are we in?
2. What is complete, in progress, not started, or blocked?
3. Who owns each remaining task?
4. What is the next action, and what does it depend on?

Prioritize the guided checklist (P0) and progress visibility (P1). Include prerequisite guidance only where it can be accurate and clearly relevant to the customer context.

## Core Experience

- A concise onboarding overview with current stage and progress.
- A guided, ordered checklist with task name, explanation, status, owner, and next action.
- Visible task dependencies and blockers.
- Clear distinction between customer-owned and provider-owned work.
- Prerequisite guidance that explains relevance and does not masquerade as an approval.
- Realistic sample data so the portfolio demo is useful without requiring production services.

## Product Guardrails

- Guide and coordinate; do not replace human teams.
- Never make or imply customer security, network, compliance, or infrastructure approval decisions.
- Do not mark a task or approval complete without an explicit recorded state.
- Do not invent product-specific prerequisites. Mark uncertain details as examples or assumptions.
- Keep customer and provider guidance consistent and ownership visible.
- Do not make AI, automated stakeholder coordination, video creation, authentication, or third-party integrations prerequisites for the MVP.

## Experience Principles

- Make the next action and owner apparent at a glance.
- Prefer a single source of truth over repeated summaries.
- Show status and dependency context, not progress percentages alone.
- Use consistent labels and plain language.
- Support desktop and mobile layouts, keyboard navigation, and accessible contrast.
- Use a restrained, professional visual system appropriate for enterprise software; keep the interface focused on the onboarding work.

## Domain Language

Use these statuses consistently: **Not started**, **In progress**, **Blocked**, and **Complete**. A task owner is either a named role/person or explicitly **Unassigned**. A dependency explains work that must happen before a task can proceed. A blocker is a known issue preventing progress. Do not conflate a task being complete with an external approval being granted.

## Data Concepts

The initial experience may use local sample data. Keep the conceptual model clear enough to replace it later:

- **Onboarding plan:** customer onboarding instance, stage, summary status, and task collection.
- **Stage:** ordered part of onboarding, such as Prepare, Configure, Validate, or Launch. Use product-neutral names unless the implementation provides confirmed product context.
- **Task:** title, description, status, owner, dependencies, next action, and optional blocker details.
- **Requirement:** prerequisite guidance, applicability context, responsible party, and reference/source when available.
- **Participant:** customer or provider role associated with tasks and the shared workspace.

Persistence, authentication, and role-based editing behavior are open product/technical decisions, not assumed capabilities.

## Success Measures

The north star is successful onboarding completion rate. Supporting measures are onboarding completion rate, median onboarding time, customer meetings/touchpoints, and prerequisite-related follow-ups/escalations. Customer Onboarding CSAT is the counter metric and must not decrease. Do not claim these outcomes from a UI prototype; they require defined events and real measurement.

## Priorities

- **P0:** Guided onboarding checklist.
- **P1:** Personalized prerequisite checker and progress dashboard.
- **P2:** AI onboarding assistant and automated stakeholder coordination; defer from MVP.
- **P3:** New onboarding videos; out of scope.

## Open Decisions

Confirm these before treating them as production requirements: supported SaaS product and deployment contexts; prerequisite content source and owner; task-plan personalization; participant permissions; persistence and hosting; onboarding completion definition; success metric instrumentation; performance, availability, accessibility, and data-retention targets.

## Implementation Guidance

The portfolio prototype uses React 19, TypeScript, Vite, Lucide icons, and responsive CSS. It has Overview, Checklist, Requirements, and People views. Task status edits are demo interactions persisted in browser local storage; the data and participant names are fictional. There is no backend, authentication, provider administration, or external approval workflow.

Read `PRD.md` before making product decisions. Keep the experience demonstrable with sample data, avoid claiming production readiness for mock behavior, and document assumptions introduced during implementation. Make the smallest complete increment, then validate it with focused tests and responsive/accessibility checks.
