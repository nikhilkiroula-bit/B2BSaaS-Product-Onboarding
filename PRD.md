# Product Requirements Document: Guided B2B SaaS Onboarding

## 1. Document Purpose

This PRD defines a guided onboarding experience for enterprise customers adopting a B2B SaaS product. It is intended to be the product source of truth for designing and building an initial repository and working application in VS Code.

Product name is a working title: **SaaS Onboarding Assistant**.

## 2. Product Summary

Enterprise onboarding is fragmented across documents, webinars, demos, technical discussions, and internal approval processes. Customers often lack a single place to understand what is required, who owns each step, what is blocked, and what to do next. SaaS-provider teams may repeat guidance across Sales, Customer Success, Solutions Architecture, Support, and Security.

The product provides one guided, trackable onboarding workspace for the customer and the SaaS provider. It presents relevant prerequisites, tasks, ownership, dependencies, progress, blockers, and next steps so customers can move toward successful product adoption with fewer manual meetings and follow-ups.

## 3. Problem Statement

Enterprise customers experience a time-consuming and fragmented onboarding journey. They must gather requirements from multiple sources and coordinate internal stakeholders for network, security, compliance, and infrastructure approvals. They interact with multiple provider teams, which can create repeated conversations, unclear ownership, and inconsistent guidance.

The resulting process depends heavily on manual coordination and meetings, increasing time-to-value and frustrating both customers and provider teams. There is no single guided experience that clearly shows requirements, ownership, progress, blockers, and next steps to both sides.

## 4. Goals and Non-Goals

### Goals

- Reduce the number of customer meetings and manual touchpoints required during onboarding.
- Give customers clear visibility into onboarding stages, prerequisites, owners, progress, blockers, dependencies, and next steps.
- Improve successful onboarding completion and accelerate time to product adoption.
- Provide accurate, consistent guidance tailored to the customer's environment and onboarding requirements.

### Non-Goals

- Creating or producing onboarding videos.
- Replacing existing Sales, Customer Success, Solutions Architecture, Support, or Security teams.
- Making or automating customer security, network, compliance, or infrastructure approval decisions.
- Eliminating all human support or customer meetings.

## 5. Users and Stakeholders

### Primary persona: Enterprise IT Administrator / System Administrator

Owns technical evaluation and setup, coordinates internal approvals, and prepares the customer environment for onboarding. This person needs a dependable source of truth, environment-relevant requirements, clear ownership, and actionable next steps.

### Customer stakeholders

- Security and compliance reviewers
- Network and infrastructure teams
- Product administrators and implementation owners
- Business sponsors and end users

### Provider stakeholders

- Customer Success Manager / Account team
- Solutions Architect or implementation specialist
- Support and Security teams, when needed

The product should clarify provider ownership and escalation paths without attempting to replace these teams.

## 6. Jobs to Be Done

- When I begin onboarding, I want to know the complete set of steps and prerequisites that apply to my organization so I can plan the work.
- When a step requires another team, I want to see its owner, dependencies, and status so I can coordinate without repeatedly asking the provider.
- When I encounter a blocker, I want to understand its cause and the next action so onboarding can keep moving.
- When I return to onboarding, I want to quickly see what is complete, what is next, and whether anything has changed.
- When provider teams support an account, they want a shared view of progress and ownership so they can give consistent guidance and avoid duplicate follow-ups.

## 7. Product Principles

- **One source of truth:** Keep onboarding requirements, status, and next steps together.
- **Clear ownership:** Every actionable task has a customer or provider owner, or is explicitly unassigned.
- **Transparent dependencies:** Show what is blocked and what must happen first.
- **Guidance, not approval:** Help customers prepare and coordinate; do not make approval decisions for them.
- **Relevant and reliable:** Present guidance that is clear, consistent, and appropriate to the customer's known environment.
- **Low effort:** Make progress understandable at a glance and reduce unnecessary meetings and repeated questions.

## 8. Customer Journey

1. **Awareness:** Customer discovers the product and explores its benefits. They are curious but may not know whether it fits their environment.
2. **Consideration:** Customer evaluates fit and requirements through product documentation, demos, and conversations. They may be interested but cautious about technical details.
3. **Onboarding:** Customer follows setup steps and coordinates approvals. Multiple internal and provider teams can create delays and confusion.
4. **Retention / adoption:** Customer uses the application, explores features, and may need configuration support.
5. **Loyalty / expansion:** Customer recommends the product, explores further use cases, or expands to more teams.

The initial product scope focuses on improving the **onboarding** stage, while keeping the experience extensible to later adoption stages.

## 9. MVP Scope and Prioritization

### P0: Guided onboarding checklist

Deliver a guided, trackable sequence of onboarding tasks that reduces complexity and makes the next action clear. This is the MVP's core experience.

### P1: Personalized prerequisite checker

Help customers identify prerequisites relevant to their environment and deployment context. Requirements must be presented as guidance; the customer retains responsibility for approvals and decisions.

### P1: Onboarding progress dashboard

Show overall status, completed and remaining work, dependencies, blockers, owners, and next steps.

### P2: AI onboarding assistant

Potentially answer onboarding questions using approved, accurate product guidance. This is not required for the initial MVP and must not invent requirements or make approval decisions.

### P2: Automated stakeholder coordination

Potentially support coordination across customer and provider stakeholders. Confidence is low and effort is high; do not make this a prerequisite for the MVP.

### P3: New onboarding videos

Out of scope for the current effort.

### MVP boundary

The first usable version should center on the guided checklist and a transparent progress view. A prerequisite checker may be included where reliable environment inputs and approved requirements are available. Do not build AI, automated approvals, or automated stakeholder coordination as MVP dependencies.

## 10. Functional Requirements

### FR-1: Guided onboarding plan

- The system shall present onboarding as a clear sequence of stages and tasks.
- Each task shall include a title, concise description, status, owner, and next action where applicable.
- Tasks may identify prerequisites or dependencies on other tasks.
- Customers shall be able to distinguish completed, not started, in progress, and blocked work.

### FR-2: Prerequisite guidance

- The system shall present relevant technical prerequisites in clear, actionable language.
- Where the customer's environment is known, the system should identify which requirements apply and explain why.
- The system shall distinguish provider guidance from customer-owned decisions and approvals.
- The system shall not represent an approval as complete unless an authorized user records that status.

### FR-3: Progress and status visibility

- The system shall show an overall onboarding status and progress summary.
- Customers shall be able to see completed work, outstanding work, blockers, dependencies, owners, and the next recommended action.
- Status changes shall be reflected consistently wherever the affected task or onboarding plan appears.

### FR-4: Ownership and coordination

- Each task shall indicate its responsible party or explicitly show that an owner is not assigned.
- Customer and provider responsibilities shall be distinguishable.
- The experience shall provide a clear way to identify when provider assistance is needed, without implying that the product replaces human teams.

### FR-5: Blockers and next steps

- A blocked task shall show the blocking dependency or reason when known.
- The experience shall state the next action and responsible party when available.
- Users shall not be shown a misleading completion state when required work remains blocked or outstanding.

### FR-6: Shared customer and provider view

- Customer and provider stakeholders shall be able to work from a consistent onboarding status and requirement set, subject to appropriate access control.
- The product shall make ownership and guidance clear enough to reduce repeated conversations and inconsistent instructions.

## 11. Acceptance Criteria

### Guided onboarding checklist

- Given an onboarding plan exists, when a customer opens it, then they can identify the current stage, completed tasks, remaining tasks, and next recommended action.
- Given a task is assigned, when the customer views it, then the responsible party is visible.
- Given a task depends on another task, when the customer views it, then the dependency and its current status are visible.
- Given a task is blocked, when the customer views it, then it is not represented as complete and the known blocker or next action is shown.

### Prerequisite guidance

- Given a prerequisite applies to the customer's onboarding context, when the customer views the plan, then the requirement and its relevance are explained in clear language.
- Given the product provides security, network, compliance, or infrastructure guidance, then the interface clearly indicates that the customer's authorized teams make the approval decision.
- Given required context is missing, then the product does not claim that a prerequisite is satisfied or irrelevant.

### Progress dashboard

- Given tasks have different statuses, when the dashboard is opened, then its summary agrees with the task-level statuses.
- Given blockers or dependencies exist, when the dashboard is opened, then customers can identify them and find the associated task and owner.
- Given a user returns to the onboarding experience, then the latest available progress and next steps are visible.

### Quality and usability

- A first-time customer can determine what to do next and who owns it without relying on a separate meeting for basic status clarification.
- Guidance uses consistent terminology and does not contradict other onboarding information shown in the product.
- The primary onboarding flow is usable on desktop and mobile layouts.

## 12. Success Metrics

### North Star

- **Successful onboarding completion rate:** Percentage of eligible customer onboardings that reach the defined successful completion milestone.

### Level 1 metrics

- Onboarding completion rate: increase.
- Median onboarding time: decrease.
- Number of customer meetings and touchpoints during onboarding: decrease.
- Prerequisite-related follow-ups and escalations: decrease.

### Counter metric

- Customer Onboarding CSAT must not decrease.

### Measurement notes

- Define the onboarding start and successful completion events before baseline measurement.
- Compare metrics against a documented pre-launch baseline and segment results where useful (for example, by customer or deployment type).
- Track both completion outcomes and the counter metric; reducing touchpoints is not success if customer satisfaction or completion declines.

## 13. Non-Functional Requirements

- **Performance:** Pages and status updates should respond quickly under expected usage. Establish measurable targets during technical planning.
- **Quality:** Guidance must be accurate, clear, and consistent with approved product and implementation information.
- **Reliability:** Onboarding status and task data should remain stable and available with minimal failures; users should not lose recorded progress.
- **Security:** Customer data must be handled securely. Access must be limited to authorized customer and provider stakeholders.
- **Transparency:** Clearly show onboarding status, dependencies, owners, blockers, and next steps.
- **Usability:** The experience should be simple, intuitive, accessible, and low effort for users with varying technical familiarity.

## 14. Assumptions and Open Product Decisions

These points are not specified in the source brief and should be confirmed during discovery or technical planning rather than silently treated as fixed requirements:

- Which SaaS product, deployment models, and customer environments are supported first.
- The authoritative source and owner for prerequisite content.
- How customer onboarding plans are created and personalized.
- Which customer and provider roles can view or update tasks and statuses.
- What event defines onboarding completion and how CSAT is collected.
- Whether the initial release includes persistence, authentication, notifications, integrations, or a provider administration experience.
- Performance, availability, accessibility, and data-retention targets.

## 15. Risks and Mitigations

- **Outdated or inaccurate requirements:** Establish content ownership and a review/update process; avoid presenting unverified guidance as definitive.
- **False confidence in approvals:** Clearly state that customer-authorized teams make approval decisions; never infer approval from checklist completion alone.
- **More work disguised as automation:** Prioritize clarity and reuse of existing guidance before adding coordination features that create extra data-entry burden.
- **Conflicting provider guidance:** Maintain a shared, approved requirement set and visible task ownership.
- **Metric optimization at the expense of experience:** Monitor onboarding CSAT alongside completion, time, and touchpoint metrics.

## 16. Suggested Initial Build Outcome

Create a working, responsive onboarding experience that demonstrates the P0 guided checklist and transparent progress view with realistic sample onboarding data. The first screen should help an Enterprise IT Administrator answer:

1. Where are we in onboarding?
2. What is complete, in progress, or blocked?
3. Who owns each remaining item?
4. What should happen next?

Keep data and technical architecture decisions aligned with the repository and implementation environment. Do not introduce unrequested product capabilities such as video creation, automatic security approvals, or mandatory AI functionality.
