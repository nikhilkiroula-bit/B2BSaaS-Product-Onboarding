export type TaskStatus = 'Not started' | 'In progress' | 'Blocked' | 'Complete'
export type OwnerType = 'Customer' | 'Provider' | 'Shared'

export type OnboardingTask = {
  id: string
  title: string
  description: string
  stage: string
  status: TaskStatus
  owner: string
  ownerType: OwnerType
  initials: string
  action: string
  dependency?: string
  blocker?: string
  needsApproval?: boolean
}

export const initialTasks: OnboardingTask[] = [
  {
    id: 'region',
    title: 'Confirm deployment region',
    description: 'Align on the region where your workspace will be provisioned.',
    stage: 'Prepare',
    status: 'Complete',
    owner: 'Alex Morgan',
    ownerType: 'Customer',
    initials: 'AM',
    action: 'Region confirmed with your provider team.',
  },
  {
    id: 'identity',
    title: 'Review single sign-on requirements',
    description: 'Check identity provider compatibility and gather the details needed for SSO setup.',
    stage: 'Prepare',
    status: 'In progress',
    owner: 'IT & Security',
    ownerType: 'Customer',
    initials: 'IS',
    action: 'Confirm your identity provider and share the admin contact.',
    needsApproval: true,
  },
  {
    id: 'endpoints',
    title: 'Allowlist service endpoints',
    description: 'Coordinate network access to the service endpoints used by your deployment.',
    stage: 'Prepare',
    status: 'Blocked',
    owner: 'Network team',
    ownerType: 'Customer',
    initials: 'NT',
    action: 'Review the endpoint reference with your network team.',
    dependency: 'Customer network review',
    blocker: 'Your network team is reviewing the provider endpoint reference before confirming the allowlisting changes.',
  },
  {
    id: 'data',
    title: 'Review data handling guidance',
    description: 'Share the product data-handling reference with your internal security and compliance reviewers.',
    stage: 'Prepare',
    status: 'In progress',
    owner: 'Security team',
    ownerType: 'Customer',
    initials: 'ST',
    action: 'Route the guidance to the appropriate reviewers.',
    needsApproval: true,
  },
  {
    id: 'access',
    title: 'Provision administrator access',
    description: 'Identify the initial administrators who will configure the workspace.',
    stage: 'Configure',
    status: 'Not started',
    owner: 'Alex Morgan',
    ownerType: 'Customer',
    initials: 'AM',
    action: 'Add the administrator list after identity setup is ready.',
    dependency: 'Single sign-on requirements',
  },
  {
    id: 'workspace',
    title: 'Configure workspace settings',
    description: 'Set the initial workspace configuration with your implementation specialist.',
    stage: 'Configure',
    status: 'Not started',
    owner: 'Sam Lee',
    ownerType: 'Provider',
    initials: 'SL',
    action: 'Schedule configuration after administrator access is provisioned.',
    dependency: 'Administrator access',
  },
  {
    id: 'endpoints-reference',
    title: 'Share service endpoint reference',
    description: 'Provide the environment-specific network reference for customer review.',
    stage: 'Configure',
    status: 'Complete',
    owner: 'Sam Lee',
    ownerType: 'Provider',
    initials: 'SL',
    action: 'Reference shared in this illustrative workspace.',
  },
  {
    id: 'readiness',
    title: 'Run launch-readiness check',
    description: 'Review setup status together and agree on any remaining work before launch.',
    stage: 'Validate',
    status: 'Not started',
    owner: 'Customer + Provider',
    ownerType: 'Shared',
    initials: 'CP',
    action: 'Start when required setup tasks are complete.',
    dependency: 'Workspace configuration',
  },
  {
    id: 'launch-handoff',
    title: 'Confirm launch handoff',
    description: 'Agree on the go-live owner and the first milestone after onboarding.',
    stage: 'Launch',
    status: 'Not started',
    owner: 'Customer + Provider',
    ownerType: 'Shared',
    initials: 'CP',
    action: 'Confirm the handoff after the readiness check.',
    dependency: 'Launch-readiness check',
  },
]

export const requirements = [
  {
    id: 'sso',
    title: 'Identity and single sign-on',
    description: 'Confirm your identity provider and identify the administrator who can support configuration.',
    category: 'Identity',
    owner: 'IT & Security',
    state: 'In review',
    taskId: 'identity',
  },
  {
    id: 'network',
    title: 'Network allowlisting',
    description: 'Review environment-specific service endpoints with your network team before making changes.',
    category: 'Network',
    owner: 'Network team',
    state: 'Customer review pending',
    taskId: 'endpoints',
  },
  {
    id: 'data-handling',
    title: 'Data handling and compliance',
    description: 'Route approved product documentation to the customer teams responsible for review.',
    category: 'Security',
    owner: 'Security team',
    state: 'In review',
    taskId: 'data',
  },
  {
    id: 'admins',
    title: 'Initial administrator access',
    description: 'Identify the people who will administer the customer workspace after setup.',
    category: 'Access',
    owner: 'Alex Morgan',
    state: 'Not started',
    taskId: 'access',
  },
]

export const team = [
  { initials: 'AM', name: 'Alex Morgan', role: 'Customer administrator', side: 'Your team', color: 'mint' },
  { initials: 'IS', name: 'IT & Security', role: 'Identity and security review', side: 'Your team', color: 'sky' },
  { initials: 'NT', name: 'Network team', role: 'Network access review', side: 'Your team', color: 'amber' },
  { initials: 'SL', name: 'Sam Lee', role: 'Implementation specialist', side: 'SaaSCo team', color: 'coral' },
]

export const stages = ['Prepare', 'Configure', 'Validate', 'Launch']
