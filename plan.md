# Build Plan: SaaS Onboarding Assistant

This plan turns [`PRD.md`](PRD.md) into a demonstrable portfolio application. The stack is React, TypeScript, and Vite; the deployment target remains open. The initial increment is implemented as noted below, so use the remaining phases as refinement and publishing work.

## Current Status

The first runnable frontend increment is implemented with React, TypeScript, and Vite. It includes the overview, stage-based checklist, requirements guidance, people view, local demo status updates, responsive layouts, and browser-local persistence. The phases below now serve as follow-up refinement and publishing work; verify the current repository before repeating completed tasks.

## Phase 0: Define the Build

- Inspect the repository and preserve its existing files and conventions.
- Choose and document a web stack that supports a responsive, accessible UI and straightforward portfolio deployment.
- Confirm the demo's product-neutral sample scenario, task statuses, owner roles, and example dependencies.
- Decide whether the first version is a read-only prototype or supports local task-status changes; state clearly which behaviors are sample-only.
- Record any assumptions that cannot be confirmed from the PRD.

**Exit criteria:** The repo has a runnable app scaffold, a documented local start command, and an agreed sample onboarding scenario. No production integrations or approval automation are introduced.

## Phase 1: Establish the Application Shell

- Create the main onboarding workspace view and responsive page structure.
- Define a consistent visual language for navigation, headings, status labels, task rows, ownership, and blockers.
- Add semantic landmarks, keyboard-accessible controls, visible focus states, and appropriate color contrast.
- Provide useful loading, empty, and error states if the chosen architecture requires them.

**Exit criteria:** The application starts locally, renders its primary workspace at desktop and mobile sizes, and can be navigated with a keyboard.

## Phase 2: Deliver the P0 Guided Checklist

- Add sample onboarding stages and ordered tasks.
- Display each task's title, concise guidance, status, owner, and next action where available.
- Show dependencies and blocker details with explicit associations to the affected task.
- Distinguish customer and provider ownership; show unassigned ownership explicitly.
- Keep task completion separate from external approval decisions.

**Exit criteria:** A first-time user can identify the onboarding stage, outstanding work, task owners, blockers, and next action using the acceptance criteria in `PRD.md`.

## Phase 3: Add Progress Visibility and Relevant Guidance

- Add an overview of plan status and progress that agrees with task-level data.
- Surface blocked and upcoming tasks without hiding their owners or dependencies.
- Add prerequisite guidance only when its applicability and source can be represented clearly.
- Ensure missing context is not interpreted as a satisfied prerequisite.

**Exit criteria:** Overview and task states are consistent; the interface clearly distinguishes guidance from customer approvals.

## Phase 4: Refine the Portfolio Experience

- Test common widths and mobile layouts; resolve overflow, truncation, and confusing density.
- Review keyboard flow, screen-reader semantics, accessible names, focus visibility, and contrast.
- Add concise product-specific sample content and polish visual hierarchy without adding decorative complexity that obscures task information.
- Capture product screenshots only after the implemented experience is stable.
- Update the README with the actual stack, setup commands, screenshots, and deployment URL if available.

**Exit criteria:** The app is easy to evaluate as a portfolio project, documentation matches the real implementation, and no placeholders are presented as finished functionality.

## Phase 5: Validate and Publish

- Run the repository's tests, lint, type checks, and production build where configured.
- Manually verify the primary flow and responsive layout.
- Check that sample data contains no real customer information or credentials.
- Verify README instructions from a clean checkout and confirm deployment instructions match the selected host.
- Publish the repository with an accurate project summary and, if deployed, a working live demo link.

**Exit criteria:** A reviewer can understand the problem, run the project, and inspect the core onboarding flow; verification results and known limitations are recorded.

## Cross-Phase Acceptance Checklist

- [ ] The first screen makes stage, progress, and next action clear.
- [ ] Every actionable task shows an owner or an explicit unassigned state.
- [ ] Blockers and dependencies are visible and correctly associated.
- [ ] Overview status agrees with task-level status.
- [ ] Guidance never implies that the product made a security, network, compliance, or infrastructure decision.
- [ ] The interface is responsive and keyboard accessible.
- [ ] Sample/demo limitations are disclosed.
- [ ] README setup and feature claims match the actual repository.

## Explicitly Deferred

Do not make the initial release depend on AI responses, automated stakeholder coordination, video creation, production authentication, integrations, analytics infrastructure, or automated customer approvals. Revisit these only after validating the core guided onboarding experience and its success measures.
