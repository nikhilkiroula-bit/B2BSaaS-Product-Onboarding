import { useEffect, useState } from 'react'
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleDashed,
  CircleHelp,
  FileCheck2,
  LayoutDashboard,
  ListChecks,
  LockKeyhole,
  Menu,
  RotateCcw,
  Search,
  ShieldCheck,
  UsersRound,
  X,
  Zap,
} from 'lucide-react'
import { initialTasks, requirements, stages, team, type OnboardingTask, type TaskStatus } from './data'

type View = 'Overview' | 'Checklist' | 'Prerequisites' | 'People'
type Filter = 'All tasks' | 'Open' | 'Blocked' | 'Complete'

const statusOptions: TaskStatus[] = ['Not started', 'In progress', 'Blocked', 'Complete']
const storageKey = 'launchline-demo-tasks-v1'

function loadTasks(): OnboardingTask[] {
  try {
    const saved = window.localStorage.getItem(storageKey)
    if (!saved) return initialTasks
    const parsed: unknown = JSON.parse(saved)
    return Array.isArray(parsed) ? (parsed as OnboardingTask[]) : initialTasks
  } catch {
    return initialTasks
  }
}

function App() {
  const [tasks, setTasks] = useState<OnboardingTask[]>(loadTasks)
  const [view, setView] = useState<View>('Overview')
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)
  const [filter, setFilter] = useState<Filter>('All tasks')
  const [query, setQuery] = useState('')
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [notice, setNotice] = useState('')

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    if (!notice) return
    const timeout = window.setTimeout(() => setNotice(''), 2800)
    return () => window.clearTimeout(timeout)
  }, [notice])

  const completeCount = tasks.filter((task) => task.status === 'Complete').length
  const blockedTasks = tasks.filter((task) => task.status === 'Blocked')
  const activeTasks = tasks.filter((task) => task.status === 'In progress')
  const progress = Math.round((completeCount / tasks.length) * 100)
  const selectedTask = tasks.find((task) => task.id === selectedTaskId)

  function updateTaskStatus(id: string, status: TaskStatus) {
    setTasks((current) => current.map((task) => task.id === id ? { ...task, status } : task))
    setNotice('Demo task status updated')
  }

  function resetDemo() {
    setTasks(initialTasks)
    setSelectedTaskId(null)
    setNotice('Demo workspace reset')
  }

  function navigate(nextView: View) {
    setView(nextView)
    setMobileNavOpen(false)
    setSelectedTaskId(null)
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileNavOpen ? 'sidebar-open' : ''}`}>
        <div className="brand-lockup">
          <div className="brand-mark" aria-hidden="true"><span /><span /><span /></div>
          <div className="brand-copy"><strong>launchline</strong><span>ONBOARDING HUB</span></div>
          <button className="icon-button mobile-close" aria-label="Close navigation" onClick={() => setMobileNavOpen(false)}><X size={18} /></button>
        </div>

        <div className="workspace-switcher">
          <div className="workspace-avatar">N</div>
          <div className="workspace-copy"><strong>Northstar Systems</strong><span>Customer workspace</span></div>
          <ChevronDown size={15} aria-hidden="true" />
        </div>

        <div className="nav-caption">WORKSPACE</div>
        <nav className="primary-nav" aria-label="Workspace navigation">
          <NavButton active={view === 'Overview'} label="Overview" icon={<LayoutDashboard size={17} />} onClick={() => navigate('Overview')} />
          <NavButton active={view === 'Checklist'} label="Onboarding checklist" icon={<ListChecks size={17} />} count={`${completeCount}/${tasks.length}`} onClick={() => navigate('Checklist')} />
          <NavButton active={view === 'Prerequisites'} label="Requirements" icon={<ShieldCheck size={17} />} onClick={() => navigate('Prerequisites')} />
          <NavButton active={view === 'People'} label="People" icon={<UsersRound size={17} />} onClick={() => navigate('People')} />
        </nav>

        <div className="sidebar-bottom">
          <div className="support-link"><CircleHelp size={17} /><span>Need a hand?</span><ArrowUpRight size={14} /></div>
          <div className="sidebar-profile">
            <div className="avatar avatar-mint">AM</div>
            <div className="profile-copy"><strong>Alex Morgan</strong><span>Workspace admin</span></div>
            <span className="profile-menu dots" aria-hidden="true">•••</span>
          </div>
        </div>
      </aside>

      {mobileNavOpen && <button className="nav-scrim" aria-label="Close navigation" onClick={() => setMobileNavOpen(false)} />}

      <main className="main-area">
        <header className="topbar">
          <button className="icon-button mobile-menu" aria-label="Open navigation" onClick={() => setMobileNavOpen(true)}><Menu size={19} /></button>
          <div className="breadcrumb"><span>Northstar Systems</span><ChevronRight size={14} /><strong>{view}</strong></div>
          <div className="topbar-actions">
            {view === 'Checklist' && <label className="search-box"><Search size={15} /><input aria-label="Search onboarding tasks" placeholder="Find a task..." value={query} onChange={(event) => setQuery(event.target.value)} /><kbd>/</kbd></label>}
            <span className="demo-tag"><span /> DEMO WORKSPACE</span>
            <div className="avatar avatar-mint top-avatar" aria-label="Alex Morgan">AM</div>
          </div>
        </header>

        <div className="content-wrap">
          {view === 'Overview' && <Overview tasks={tasks} progress={progress} completeCount={completeCount} blockedTasks={blockedTasks} activeTasks={activeTasks} openTask={setSelectedTaskId} navigate={navigate} />}
          {view === 'Checklist' && <Checklist tasks={tasks} filter={filter} setFilter={setFilter} query={query} openTask={setSelectedTaskId} />}
          {view === 'Prerequisites' && <Requirements openTask={setSelectedTaskId} />}
          {view === 'People' && <People />}

          <footer className="page-footer"><span><LockKeyhole size={13} /> Demo data is saved only in this browser</span><button onClick={resetDemo}><RotateCcw size={13} /> Reset demo</button></footer>
        </div>
      </main>

      {selectedTask && <TaskPanel task={selectedTask} close={() => setSelectedTaskId(null)} updateStatus={updateTaskStatus} />}
      {notice && <div className="toast" role="status"><Check size={15} />{notice}</div>}
    </div>
  )
}

function NavButton({ active, label, icon, count, onClick }: { active: boolean; label: string; icon: React.ReactNode; count?: string; onClick: () => void }) {
  return <button className={`nav-item ${active ? 'nav-active' : ''}`} aria-current={active ? 'page' : undefined} onClick={onClick}>{icon}<span>{label}</span>{count && <small>{count}</small>}</button>
}

function PageHeading({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: React.ReactNode }) {
  return <div className="page-heading"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{description}</p></div>{action && <div className="heading-action">{action}</div>}</div>
}

function StageRail({ tasks }: { tasks: OnboardingTask[] }) {
  const stagesWithState = stages.map((stage) => {
    const stageTasks = tasks.filter((task) => task.stage === stage)
    const done = stageTasks.length > 0 && stageTasks.every((task) => task.status === 'Complete')
    const current = stageTasks.some((task) => task.status === 'In progress' || task.status === 'Blocked')
    return { name: stage, done, current, count: stageTasks.length }
  })

  return <div className="stage-rail" aria-label="Onboarding stages">
    {stagesWithState.map((stage, index) => <div key={stage.name} className={`stage-step ${stage.done ? 'stage-done' : ''} ${stage.current ? 'stage-current' : ''}`}>
      <div className="stage-node">{stage.done ? <Check size={13} /> : `0${index + 1}`}</div>
      <div className="stage-label"><strong>{stage.name}</strong><span>{stage.done ? 'Complete' : stage.current ? 'In progress' : stage.count ? `${stage.count} ${stage.count === 1 ? 'task' : 'tasks'}` : 'Up next'}</span></div>
      {index < stages.length - 1 && <div className="stage-connector" />}
    </div>)}
  </div>
}

function Overview({ tasks, progress, completeCount, blockedTasks, activeTasks, openTask, navigate }: { tasks: OnboardingTask[]; progress: number; completeCount: number; blockedTasks: OnboardingTask[]; activeTasks: OnboardingTask[]; openTask: (id: string) => void; navigate: (view: View) => void }) {
  const nextTask = activeTasks[0] ?? tasks.find((task) => task.status !== 'Complete' && task.status !== 'Blocked') ?? blockedTasks[0]
  const openTasks = tasks.filter((task) => task.status !== 'Complete').slice(0, 4)
  const currentStage = tasks.find((task) => task.status === 'In progress')?.stage ?? 'Prepare'

  return <>
    <PageHeading eyebrow="CUSTOMER ONBOARDING / NORTHSTAR SYSTEMS" title="A clearer path to go-live." description="Keep every team moving with one shared view of setup, ownership, and what happens next." action={<span className="status-pill status-in-progress"><span /> Onboarding in progress</span>} />

    <StageRail tasks={tasks} />

    <section className="overview-grid" aria-label="Onboarding summary">
      <div className="overview-main">
        <div className="progress-panel surface-panel">
          <div className="panel-kicker"><span className="kicker-icon"><Activity size={16} /></span><span>YOUR ONBOARDING</span><span className="sample-label">ILLUSTRATIVE DATA</span></div>
          <div className="progress-title-row"><div><h2>Build momentum, one step at a time.</h2><p>You're in <strong>{currentStage}</strong>. Pick up where your team left off.</p></div><div className="progress-number"><strong>{progress}%</strong><span>complete</span></div></div>
          <div className="progress-track" role="progressbar" aria-label="Onboarding tasks completed" aria-valuemin={0} aria-valuemax={tasks.length} aria-valuenow={completeCount}><span style={{ width: `${progress}%` }} /></div>
          <div className="progress-meta"><span><strong>{completeCount}</strong> of {tasks.length} tasks complete</span><button className="text-action" onClick={() => navigate('Checklist')}>View checklist <ArrowRight size={14} /></button></div>
        </div>

        <div className="section-heading"><div><span className="eyebrow">KEEP THINGS MOVING</span><h2>Next up</h2></div><button className="subtle-link" onClick={() => navigate('Checklist')}>All tasks <ArrowRight size={14} /></button></div>
        <div className="task-list overview-task-list">
          {openTasks.map((task, index) => <TaskRow key={task.id} task={task} index={index} open={() => openTask(task.id)} compact />)}
        </div>
      </div>

      <aside className="overview-aside">
        <div className="next-action-panel">
          <div className="next-action-top"><span className="eyebrow">RECOMMENDED NEXT STEP</span><span className="sparkle-mark"><Zap size={15} /></span></div>
          {nextTask ? <>
            <div className="next-action-title">{nextTask.title}</div>
            <p>{nextTask.action}</p>
            <div className="next-action-owner"><div className="avatar avatar-small avatar-sky">{nextTask.initials}</div><span>Owned by <strong>{nextTask.owner}</strong></span></div>
            <button className="primary-button" onClick={() => openTask(nextTask.id)}>Open task <ArrowUpRight size={15} /></button>
          </> : <><div className="next-action-title">Your onboarding is complete</div><p>All sample tasks are marked complete.</p></>}
        </div>

        <div className="attention-panel surface-panel">
          <div className="attention-heading"><div className="attention-icon"><ArrowDownRight size={16} /></div><div><h3>Needs attention</h3><span>{blockedTasks.length} blocked {blockedTasks.length === 1 ? 'task' : 'tasks'}</span></div></div>
          {blockedTasks.length ? blockedTasks.map((task) => <button className="blocker-link" key={task.id} onClick={() => openTask(task.id)}><span className="blocker-dot" /><span><strong>{task.title}</strong><small>{task.dependency ? `Waiting on ${task.dependency.toLowerCase()}` : 'Blocked'}</small></span><ChevronRight size={15} /></button>) : <div className="clear-state"><CheckCircle2 size={17} /> No blockers right now</div>}
          <div className="approval-note"><LockKeyhole size={14} /><p>This workspace tracks readiness. Your team makes all security and compliance decisions.</p></div>
        </div>
      </aside>
    </section>
    <div className="trust-strip"><div className="trust-icon"><ShieldCheck size={18} /></div><div><strong>One shared source of truth</strong><span>Customer tasks and provider guidance, together in one place.</span></div><button aria-label="Learn about the shared onboarding workspace" onClick={() => navigate('Prerequisites')}><ArrowUpRight size={16} /></button></div>
  </>
}

function TaskRow({ task, index, open, compact = false }: { task: OnboardingTask; index: number; open: () => void; compact?: boolean }) {
  const statusClass = task.status.toLowerCase().replace(' ', '-')
  return <button className={`task-row ${compact ? 'task-row-compact' : ''}`} onClick={open}>
    <span className={`task-index ${task.status === 'Complete' ? 'task-index-done' : ''}`}>{task.status === 'Complete' ? <Check size={14} /> : String(index + 1).padStart(2, '0')}</span>
    <span className="task-row-copy"><strong>{task.title}</strong><small>{task.action}</small></span>
    <span className="task-owner"><span className={`avatar avatar-small ${task.ownerType === 'Provider' ? 'avatar-coral' : task.ownerType === 'Shared' ? 'avatar-violet' : 'avatar-sky'}`}>{task.initials}</span><span>{task.owner}</span></span>
    <span className={`status-pill status-${statusClass}`}><span />{task.status}</span>
    <ChevronRight className="task-chevron" size={16} />
  </button>
}

function Checklist({ tasks, filter, setFilter, query, openTask }: { tasks: OnboardingTask[]; filter: Filter; setFilter: (filter: Filter) => void; query: string; openTask: (id: string) => void }) {
  const filteredTasks = tasks.filter((task) => {
    const matchesFilter = filter === 'All tasks' || (filter === 'Open' ? task.status !== 'Complete' : task.status === filter)
    const matchesQuery = `${task.title} ${task.owner} ${task.stage} ${task.action}`.toLowerCase().includes(query.toLowerCase())
    return matchesFilter && matchesQuery
  })
  const filters: Filter[] = ['All tasks', 'Open', 'Blocked', 'Complete']

  return <>
    <PageHeading eyebrow="THE WORK, MADE VISIBLE" title="Onboarding checklist" description="Every step, owner, and dependency in one shared plan." action={<span className="read-only-tag"><LockKeyhole size={13} /> Local demo</span>} />
    <StageRail tasks={tasks} />
    <div className="list-toolbar"><div className="filter-tabs" role="tablist" aria-label="Filter tasks">{filters.map((item) => <button key={item} role="tab" aria-selected={filter === item} className={filter === item ? 'filter-active' : ''} onClick={() => setFilter(item)}>{item}{item === 'Blocked' && tasks.filter((task) => task.status === 'Blocked').length > 0 && <span className="filter-count">{tasks.filter((task) => task.status === 'Blocked').length}</span>}</button>)}</div><span className="result-count">{filteredTasks.length} tasks</span></div>
    {filteredTasks.length ? <div className="checklist-groups">{stages.map((stage) => {
      const stageTasks = filteredTasks.filter((task) => task.stage === stage)
      if (!stageTasks.length) return null
      const done = stageTasks.filter((task) => task.status === 'Complete').length
      return <section className="stage-group" key={stage}><div className="stage-group-heading"><span className="stage-bullet" /><h2>{stage}</h2><span>{done}/{stageTasks.length} complete</span></div><div className="task-list">{stageTasks.map((task, index) => <TaskRow key={task.id} task={task} index={index} open={() => openTask(task.id)} />)}</div></section>
    })}</div> : <div className="empty-state"><Search size={22} /><strong>No matching tasks</strong><span>Try another search or filter.</span></div>}
    <div className="inline-disclaimer"><LockKeyhole size={15} /><span>Task status is for coordination only. It does not record or grant customer security, network, or compliance approval.</span></div>
  </>
}

function Requirements({ openTask }: { openTask: (id: string) => void }) {
  return <>
    <PageHeading eyebrow="GUIDANCE, NOT APPROVAL" title="Requirements & readiness" description="Keep prerequisite guidance connected to the work and the people responsible." />
    <div className="notice-banner"><div className="notice-banner-icon"><ShieldCheck size={18} /></div><div><strong>Customer teams remain the decision-makers.</strong><span>These illustrative requirements help organize reviews. Confirm actual requirements with your provider before making changes.</span></div></div>
    <div className="requirements-summary"><div><span className="eyebrow">REVIEW TRACKER</span><h2>What your teams are working through</h2></div><span className="read-only-tag"><FileCheck2 size={14} /> Example guidance</span></div>
    <div className="requirement-list">{requirements.map((requirement, index) => <button className="requirement-row" key={requirement.id} onClick={() => openTask(requirement.taskId)}>
      <div className={`requirement-symbol requirement-symbol-${index}`}><ShieldCheck size={18} /></div>
      <div className="requirement-copy"><span className="requirement-category">{requirement.category}</span><strong>{requirement.title}</strong><p>{requirement.description}</p></div>
      <div className="requirement-owner"><span>OWNER</span><strong>{requirement.owner}</strong></div>
      <span className={`requirement-state ${requirement.state === 'Waiting on reference' ? 'requirement-waiting' : requirement.state === 'Not started' ? 'requirement-pending' : ''}`}><span />{requirement.state}</span>
      <ChevronRight size={16} className="task-chevron" />
    </button>)}</div>
    <div className="requirement-footnote"><LockKeyhole size={14} /><span>No approval is granted or inferred here. Use your organization's approved review process.</span></div>
  </>
}

function People() {
  return <>
    <PageHeading eyebrow="SHARED OWNERSHIP" title="People in the plan" description="Know who is involved and where each responsibility sits." action={<span className="read-only-tag"><UsersRound size={14} /> 4 participants</span>} />
    <div className="people-callout"><div className="people-callout-icon"><UsersRound size={19} /></div><div><strong>One plan, two teams.</strong><span>Customer and provider responsibilities stay visible so work doesn't disappear between conversations.</span></div></div>
    <div className="people-section"><div className="people-section-heading"><div><span className="eyebrow">CUSTOMER SIDE</span><h2>Your team</h2></div><span>3 participants</span></div>
      {team.filter((person) => person.side === 'Your team').map((person) => <PersonRow key={person.initials} person={person} />)}
    </div>
    <div className="people-section"><div className="people-section-heading"><div><span className="eyebrow">PROVIDER SIDE</span><h2>SaaSCo team</h2></div><span>1 participant</span></div>
      {team.filter((person) => person.side === 'SaaSCo team').map((person) => <PersonRow key={person.initials} person={person} />)}
    </div>
    <div className="inline-disclaimer"><CircleHelp size={15} /><span>Participant names and responsibilities are fictional examples for this portfolio demo.</span></div>
  </>
}

function PersonRow({ person }: { person: typeof team[number] }) {
  return <div className="person-row"><div className={`avatar person-avatar avatar-${person.color}`}>{person.initials}</div><div className="person-copy"><strong>{person.name}</strong><span>{person.role}</span></div><span className="participant-label">{person.side}</span><span className="person-action" aria-hidden="true"><ArrowUpRight size={16} /></span></div>
}

function TaskPanel({ task, close, updateStatus }: { task: OnboardingTask; close: () => void; updateStatus: (id: string, status: TaskStatus) => void }) {
  return <div className="drawer-layer" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) close() }}>
    <aside className="task-drawer" role="dialog" aria-modal="true" aria-labelledby="task-dialog-title">
      <div className="drawer-top"><span className="eyebrow">{task.stage.toUpperCase()} / ONBOARDING TASK</span><button className="icon-button drawer-close" aria-label="Close task details" onClick={close}><X size={18} /></button></div>
      <div className="drawer-status"><span className={`status-pill status-${task.status.toLowerCase().replace(' ', '-')}`}><span />{task.status}</span><span className="task-demo-chip">Demo item</span></div>
      <h2 id="task-dialog-title">{task.title}</h2>
      <p className="drawer-description">{task.description}</p>
      <div className="drawer-divider" />
      <div className="drawer-detail"><span className="eyebrow">TASK OWNER</span><div className="drawer-owner"><div className={`avatar avatar-small ${task.ownerType === 'Provider' ? 'avatar-coral' : task.ownerType === 'Shared' ? 'avatar-violet' : 'avatar-sky'}`}>{task.initials}</div><div><strong>{task.owner}</strong><span>{task.ownerType} responsibility</span></div></div></div>
      {task.dependency && <div className="drawer-detail"><span className="eyebrow">DEPENDENCY</span><div className="dependency-box"><CircleDashed size={16} /><span>{task.dependency}</span></div></div>}
      {task.blocker && task.status === 'Blocked' && <div className="drawer-blocker"><div className="blocker-dot" /><div><strong>What's holding this up</strong><span>{task.blocker}</span></div></div>}
      <div className="drawer-detail"><span className="eyebrow">NEXT ACTION</span><div className="next-action-box"><ArrowRight size={16} /><span>{task.action}</span></div></div>
      {task.needsApproval && <div className="drawer-approval-note"><LockKeyhole size={15} /><span>Tracking this task does not approve a security or compliance review. Your authorized team makes that decision.</span></div>}
      <div className="drawer-status-control"><label className="eyebrow" htmlFor="task-status">UPDATE DEMO STATUS</label><div className="select-wrap"><select id="task-status" value={task.status} onChange={(event) => updateStatus(task.id, event.target.value as TaskStatus)}>{statusOptions.map((status) => <option key={status} value={status}>{status}</option>)}</select><ChevronDown size={16} /></div><span>Changes are saved in this browser only.</span></div>
    </aside>
  </div>
}

export default App
