// Card Templates - Organized by Role
// Each card has: title, phase, description, order, role

export interface Card {
  title: string;
  phase: string;
  description: string;
  order: number;
  role: 'base' | 'pm' | 'uxr' | 'ui';  // Role for labeling in Trello
}

// ============================================
// BASE CARDS - Everyone gets these
// ============================================
export const baseCards: Card[] = [
  {
    title: "Project kickoff meeting",
    phase: "Admin",
    description: "Align team on goals, timeline, and ways of working",
    order: 1,
    role: 'base'
  },
  {
    title: "Project retrospective",
    phase: "Delivery",
    description: "Reflect on what worked, what didn't, lessons learned",
    order: 1,
    role: 'base'
  },
  {
    title: "Archive & handoff",
    phase: "Delivery",
    description: "Organize final deliverables and transfer knowledge",
    order: 2,
    role: 'base'
  }
];

// ============================================
// PM CARDS - Project Manager tasks
// ============================================
export const pmCards: Card[] = [
  // Frame Phase
  {
    title: "Define project scope",
    phase: "Frame",
    description: "Document what's in/out of scope, constraints, assumptions",
    order: 1,
    role: 'pm'
  },
  {
    title: "Create project timeline",
    phase: "Frame",
    description: "Build realistic schedule with milestones and dependencies",
    order: 2,
    role: 'pm'
  },
  {
    title: "Identify stakeholders",
    phase: "Frame",
    description: "Map key stakeholders, their interests, and communication needs",
    order: 3,
    role: 'pm'
  },
  {
    title: "Set success metrics",
    phase: "Frame",
    description: "Define measurable criteria for project success",
    order: 4,
    role: 'pm'
  },
  
  // Research Phase
  {
    title: "Coordinate research logistics",
    phase: "Research",
    description: "Schedule sessions, manage resources, track budget",
    order: 1,
    role: 'pm'
  },
  
  // Synthesis Phase
  {
    title: "Prioritize insights",
    phase: "Synthesis",
    description: "Work with team to rank findings by impact and feasibility",
    order: 1,
    role: 'pm'
  },
  
  // Define Phase
  {
    title: "Facilitate feature prioritization",
    phase: "Define",
    description: "Lead team through prioritization framework (MoSCoW, RICE, etc)",
    order: 1,
    role: 'pm'
  },
  {
    title: "Create requirement docs",
    phase: "Define",
    description: "Document functional and non-functional requirements",
    order: 2,
    role: 'pm'
  },
  
  // Prototype Phase
  {
    title: "Manage prototype scope",
    phase: "Prototype",
    description: "Ensure prototype addresses key questions without scope creep",
    order: 1,
    role: 'pm'
  },
  
  // Testing Phase
  {
    title: "Coordinate testing schedule",
    phase: "Testing",
    description: "Arrange sessions, participants, and resources",
    order: 1,
    role: 'pm'
  },
  {
    title: "Track issues and bugs",
    phase: "Testing",
    description: "Log, prioritize, and manage resolution of findings",
    order: 2,
    role: 'pm'
  },
  
  // Delivery Phase
  {
    title: "Prepare stakeholder presentation",
    phase: "Delivery",
    description: "Create final presentation highlighting outcomes and recommendations",
    order: 1,
    role: 'pm'
  },
  {
    title: "Document lessons learned",
    phase: "Delivery",
    description: "Capture what worked, what didn't, recommendations for next time",
    order: 2,
    role: 'pm'
  }
];

// ============================================
// UXR CARDS - UX Researcher tasks
// ============================================
export const uxrCards: Card[] = [
  // Frame Phase
  {
    title: "Define research questions",
    phase: "Frame",
    description: "Identify key unknowns that research needs to answer",
    order: 5,
    role: 'uxr'
  },
  
  // Research Phase
  {
    title: "Create research plan",
    phase: "Research",
    description: "Define methods, timeline, participants, and deliverables",
    order: 2,
    role: 'uxr'
  },
  {
    title: "Write discussion guide",
    phase: "Research",
    description: "Develop questions and activities for user sessions",
    order: 3,
    role: 'uxr'
  },
  {
    title: "Recruit participants",
    phase: "Research",
    description: "Find and screen users matching target criteria",
    order: 4,
    role: 'uxr'
  },
  {
    title: "Conduct user interviews",
    phase: "Research",
    description: "Run sessions, take notes, record (with permission)",
    order: 5,
    role: 'uxr'
  },
  {
    title: "Organize research data",
    phase: "Research",
    description: "Transcribe, tag, and prepare data for analysis",
    order: 6,
    role: 'uxr'
  },
  
  // Synthesis Phase
  {
    title: "Affinity mapping",
    phase: "Synthesis",
    description: "Group observations into themes and patterns",
    order: 2,
    role: 'uxr'
  },
  {
    title: "Identify user needs",
    phase: "Synthesis",
    description: "Articulate core user problems and motivations",
    order: 3,
    role: 'uxr'
  },
  {
    title: "Create personas",
    phase: "Synthesis",
    description: "Develop representative user archetypes with goals and pain points",
    order: 4,
    role: 'uxr'
  },
  {
    title: "Present research findings",
    phase: "Synthesis",
    description: "Share insights with team through presentation or workshop",
    order: 5,
    role: 'uxr'
  },
  
  // Testing Phase
  {
    title: "Write usability test plan",
    phase: "Testing",
    description: "Define test objectives, tasks, and success criteria",
    order: 3,
    role: 'uxr'
  },
  {
    title: "Create test script",
    phase: "Testing",
    description: "Write scenarios and tasks for participants",
    order: 4,
    role: 'uxr'
  },
  {
    title: "Recruit test participants",
    phase: "Testing",
    description: "Find users matching target audience for testing",
    order: 5,
    role: 'uxr'
  },
  {
    title: "Conduct usability tests",
    phase: "Testing",
    description: "Run test sessions, observe, and document findings",
    order: 6,
    role: 'uxr'
  },
  {
    title: "Analyze test results",
    phase: "Testing",
    description: "Identify patterns, severity ratings, and recommendations",
    order: 7,
    role: 'uxr'
  },
  {
    title: "Create findings report",
    phase: "Testing",
    description: "Document issues found with evidence and recommendations",
    order: 8,
    role: 'uxr'
  }
];

// ============================================
// UI CARDS - UI Designer tasks
// ============================================
export const uiCards: Card[] = [
  // Frame Phase
  {
    title: "Audit existing designs",
    phase: "Frame",
    description: "Review current UI, identify inconsistencies and opportunities",
    order: 6,
    role: 'ui'
  },
  
  // Define Phase
  {
    title: "Create user flows",
    phase: "Define",
    description: "Map out step-by-step paths users take through product",
    order: 3,
    role: 'ui'
  },
  {
    title: "Design information architecture",
    phase: "Define",
    description: "Organize content structure, navigation, and labeling",
    order: 4,
    role: 'ui'
  },
  {
    title: "Create wireframes",
    phase: "Define",
    description: "Sketch low-fidelity layouts showing structure and content",
    order: 5,
    role: 'ui'
  },
  
  // UI System Phase
  {
    title: "Define design tokens",
    phase: "UI System",
    description: "Establish colors, typography, spacing, and other foundation values",
    order: 1,
    role: 'ui'
  },
  {
    title: "Create component library",
    phase: "UI System",
    description: "Design reusable UI components (buttons, inputs, cards, etc)",
    order: 2,
    role: 'ui'
  },
  {
    title: "Document design system",
    phase: "UI System",
    description: "Write usage guidelines, do's and don'ts for each component",
    order: 3,
    role: 'ui'
  },
  {
    title: "Design system QA",
    phase: "UI System",
    description: "Test components in various contexts, ensure consistency",
    order: 4,
    role: 'ui'
  },
  
  // Prototype Phase
  {
    title: "Design high-fidelity screens",
    phase: "Prototype",
    description: "Create polished UI designs with real content and visuals",
    order: 2,
    role: 'ui'
  },
  {
    title: "Build interactive prototype",
    phase: "Prototype",
    description: "Connect screens with interactions for realistic testing",
    order: 3,
    role: 'ui'
  },
  {
    title: "Create design specs",
    phase: "Prototype",
    description: "Document measurements, behaviors, and assets for developers",
    order: 4,
    role: 'ui'
  },
  
  // Testing Phase
  {
    title: "Update designs based on feedback",
    phase: "Testing",
    description: "Iterate on UI based on test findings and team input",
    order: 9,
    role: 'ui'
  },
  
  // Delivery Phase
  {
    title: "Prepare design handoff",
    phase: "Delivery",
    description: "Package final designs, assets, and documentation for development",
    order: 3,
    role: 'ui'
  },
  {
    title: "Create design system guide",
    phase: "Delivery",
    description: "Final documentation of design patterns and components",
    order: 4,
    role: 'ui'
  }
];

// ============================================
// ASSEMBLY FUNCTION
// ============================================
export const assembleCards = (roles: string[]): Card[] => {
  const cards: Card[] = [...baseCards]; // Always include base cards
  
  if (roles.includes('pm')) {
    cards.push(...pmCards);
  }
  
  if (roles.includes('uxr')) {
    cards.push(...uxrCards);
  }
  
  if (roles.includes('ui')) {
    cards.push(...uiCards);
  }
  
  // Sort by phase order, then by card order within phase
  const phaseOrder: { [key: string]: number } = {
    'Admin': 1,
    'Frame': 2,
    'Research': 3,
    'Synthesis': 4,
    'Define': 5,
    'UI System': 6,
    'Prototype': 7,
    'Testing': 8,
    'Delivery': 9
  };
  
  return cards.sort((a, b) => {
    const phaseCompare = phaseOrder[a.phase] - phaseOrder[b.phase];
    if (phaseCompare !== 0) return phaseCompare;
    return a.order - b.order;
  });
};

// ============================================
// HELPER FUNCTIONS
// ============================================
export const getCardCount = (roles: string[]): number => {
  return assembleCards(roles).length;
};

export const getRoleBreakdown = (roles: string[]): {
  base: number;
  pm: number;
  uxr: number;
  ui: number;
  total: number;
} => {
  return {
    base: baseCards.length,
    pm: roles.includes('pm') ? pmCards.length : 0,
    uxr: roles.includes('uxr') ? uxrCards.length : 0,
    ui: roles.includes('ui') ? uiCards.length : 0,
    total: getCardCount(roles)
  };
};

export const getPhaseCount = (): number => {
  return 8; // Always 8 phases regardless of roles
};

export const getListCount = (): number => {
  return 8; // One list per phase
};

// ============================================
// TRELLO LABEL HELPERS
// ============================================

export interface TrelloLabel {
  name: string;
  color: string;
}

// Get label configuration for Trello
export const getTrelloLabels = (): TrelloLabel[] => {
  return [
    { name: 'PM', color: 'purple' },
    { name: 'UXR', color: 'blue' },
    { name: 'UI', color: 'green' },
    { name: 'Everyone', color: 'yellow' }
  ];
};

// Get label name for a card
export const getCardLabel = (card: Card): string => {
  const labelMap: { [key: string]: string } = {
    'base': 'Everyone',
    'pm': 'PM',
    'uxr': 'UXR',
    'ui': 'UI'
  };
  return labelMap[card.role] || 'Everyone';
};
