// Trello API Service
// Handles all Trello OAuth and API interactions

import { assembleCards, getTrelloLabels, getCardLabel, type Card } from './cardTemplates';

// Declare Trello global from client.js
declare global {
  interface Window {
    Trello: {
      authorize: (options: {
        name: string;
        type?: string;
        interactive?: boolean;
        scope: { read: string; write: string } | { read: boolean; write: boolean };
        expiration: string;
        return_url?: string;
        success: () => void;
        error: (error?: Error) => void;
      }) => void;
      post: (path: string, data?: any) => Promise<any>;
      get: (path: string) => Promise<any>;
      authorized: () => boolean;
      deauthorize: () => void;
    };
  }
}

export interface BoardCreationResult {
  boardId: string;
  boardUrl: string;
  boardName: string;
  listsCreated: number;
  cardsCreated: number;
  labelsCreated: number;
}

interface PhaseDueDates {
  [phase: string]: string | null;
}

// Calculate due dates for each phase based on deadline and intensity
function calculatePhaseDates(
  deadline?: Date,
  intensity?: string
): PhaseDueDates {
  // If no deadline provided, return empty dates
  if (!deadline) {
    return {
      'Admin': null,
      'Frame': null,
      'Research': null,
      'Synthesis': null,
      'Define': null,
      'UI System': null,
      'Prototype': null,
      'Testing': null,
      'Delivery': null
    };
  }

  const now = new Date();
  const endDate = new Date(deadline);
  const totalDays = Math.floor((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  // If deadline is in the past or too soon, return nulls
  if (totalDays < 7) {
    console.warn('⚠️ Deadline too soon (less than 7 days), skipping auto-dates');
    return {
      'Admin': null,
      'Frame': null,
      'Research': null,
      'Synthesis': null,
      'Define': null,
      'UI System': null,
      'Prototype': null,
      'Testing': null,
      'Delivery': null
    };
  }

  // Phase weights (relative time allocation)
  // Chill = more time per phase, Crunch = compressed timeline
  const isChill = intensity?.toLowerCase() === 'chill';
  
  const phaseWeights: { [key: string]: number } = {
    'Admin': 0.5,      // Quick setup
    'Frame': 1,        // Project framing
    'Research': isChill ? 3 : 2,     // Research phase
    'Synthesis': isChill ? 2 : 1.5,  // Analysis
    'Define': 1.5,     // Definition
    'UI System': isChill ? 2 : 1.5,  // Design system
    'Prototype': isChill ? 2.5 : 2,  // Prototyping
    'Testing': isChill ? 2 : 1.5,    // User testing
    'Delivery': 1      // Final delivery
  };

  const totalWeight = Object.values(phaseWeights).reduce((a, b) => a + b, 0);
  const daysPerWeight = totalDays / totalWeight;

  // Calculate due date for each phase (end of that phase)
  let currentDate = new Date(now);
  const phaseDates: PhaseDueDates = {};
  
  const phases = [
    'Admin',
    'Frame',
    'Research',
    'Synthesis',
    'Define',
    'UI System',
    'Prototype',
    'Testing',
    'Delivery'
  ];

  for (const phase of phases) {
    const daysForPhase = Math.ceil(phaseWeights[phase] * daysPerWeight);
    currentDate = new Date(currentDate.getTime() + (daysForPhase * 24 * 60 * 60 * 1000));
    
    // Ensure we don't go past the deadline
    if (currentDate > endDate) {
      currentDate = new Date(endDate);
    }
    
    // Format as ISO string for Trello (YYYY-MM-DDTHH:mm:ss.sssZ)
    phaseDates[phase] = currentDate.toISOString();
  }

  // Ensure Delivery ends exactly at deadline
  phaseDates['Delivery'] = endDate.toISOString();

  console.log('📅 Calculated phase dates:', phaseDates);
  return phaseDates;
}

// Silent authorization check (no popup)
export const checkExistingAuth = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (!window.Trello) {
      resolve(false);
      return;
    }

    window.Trello.authorize({
      interactive: false,
      name: 'Scaffold - UX Workflow Installer',
      type: 'popup',
      scope: {
        read: true,
        write: true,
      },
      expiration: '1day',
      success: () => {
        console.log('✅ Silent auth check: Already authorized!');
        resolve(true);
      },
      error: () => {
        console.log('ℹ️ Silent auth check: Not authorized yet');
        resolve(false);
      }
    });
  });
};

// Authorization
export const authorizeTrello = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    if (!window.Trello) {
      reject(new Error('Trello client not loaded. Make sure index.html includes the Trello script.'));
      return;
    }

    window.Trello.authorize({
      name: 'Scaffold - UX Workflow Installer',
      type: 'popup',
      scope: {
        read: true,
        write: true,
      },
      expiration: '1day',
      success: () => {
        console.log('✅ Trello authorization successful');
        resolve(true);
      },
      error: (error?: Error) => {
        console.error('❌ Trello authorization failed:', error);
        reject(error);
      }
    });
  });
};

// Check if already authorized
export const isAuthorized = (): boolean => {
  return window.Trello?.authorized() || false;
};

// Deauthorize
export const deauthorizeTrello = () => {
  window.Trello?.deauthorize();
};

// Create complete board with all content
export const createCompleteBoard = async (
  projectName: string,
  roles: string[],
  teamEmails?: string,
  deadline?: Date,
  intensity?: string
): Promise<BoardCreationResult> => {
  
  if (!isAuthorized()) {
    throw new Error('Not authorized with Trello. Please authorize first.');
  }

  try {
    // 1. Create Board
    console.log('📋 Creating board:', projectName);
    const board = await window.Trello.post('/boards', {
      name: projectName || 'UX Project Board',
      defaultLists: false,
      prefs_permissionLevel: 'private',
      prefs_background: 'blue',
    });

    const boardId = board.id;
    const boardUrl = board.url;
    console.log('✅ Board created:', boardUrl);

    // 2. Calculate phase dates
    console.log('📅 Calculating phase dates...');
    const phaseDates = calculatePhaseDates(deadline, intensity);

    // 3. Create Labels
    console.log('🏷️ Creating role labels...');
    const labels = getTrelloLabels();
    const labelMap: { [key: string]: string } = {};

    for (const label of labels) {
      const createdLabel = await window.Trello.post(`/boards/${boardId}/labels`, {
        name: label.name,
        color: label.color,
      });
      labelMap[label.name] = createdLabel.id;
    }
    console.log('✅ Labels created:', labels.length);

    // 4. Create Lists (Phases)
    console.log('📝 Creating phase lists...');
    const phases = [
      'Admin',
      'Frame', 
      'Research',
      'Synthesis',
      'Define',
      'UI System',
      'Prototype',
      'Testing',
      'Delivery'
    ];

    const listMap: { [key: string]: string } = {};
    
    for (const phase of phases) {
      const list = await window.Trello.post(`/boards/${boardId}/lists`, {
        name: phase,
        pos: 'bottom'
      });
      listMap[phase] = list.id;
    }
    console.log('✅ Lists created:', phases.length);

    // 5. Create Cards from templates
    console.log('🎴 Creating cards based on roles:', roles);
    const cards = assembleCards(roles);
    
    for (const card of cards) {
      const labelName = getCardLabel(card);
      const labelId = labelMap[labelName];
      const dueDate = phaseDates[card.phase];
      
      const cardData: any = {
        name: card.title,
        desc: card.description,
        idList: listMap[card.phase],
        idLabels: labelId ? [labelId] : [],
        pos: 'bottom'
      };
      
      // Add due date if available
      if (dueDate) {
        cardData.due = dueDate;
      }
      
      await window.Trello.post('/cards', cardData);
    }
    console.log('✅ Cards created:', cards.length);

    // 6. Create "Read me first" card in Admin
console.log('📖 Creating "Read me first" card...');
await window.Trello.post('/cards', {
  name: '📖 Read me first',
  desc: `# Welcome to your UX project board!

This board was created by Scaffold to give your team a ready-to-run workflow.

## How to use this board:

**1. Work through phases left to right**
Each column represents a phase of your project. Complete cards in order.

**2. Use role labels to find your tasks**
- 🟣 Purple = PM tasks
- 🔵 Blue = UXR tasks  
- 🟢 Green = UI tasks
- 🟡 Yellow = Everyone

**3. Definition of Done**
Each card has a checklist. Complete all items before moving on.

**4. Link your work**
When you finish a card, paste your deliverable link (Figma, Google Docs, etc.) in the card description.

**Quick rule:** No link = not ready for review.

## Decision Log

Use the "Decision Log" card to track important choices your team makes. Document:
- What you decided
- Why you chose it
- What alternatives you considered

This helps with handoffs and grading!

---

**Need help?** Check out the tooltips on each card for guidance.

**Questions?** Ask in card comments so context stays together.

Let's ship this! 🚀`,
  idList: listMap['Admin'],
  pos: 'top',
  due: phaseDates['Admin'] || null  // ← ADD DUE DATE HERE!
});

    // 7. Create "Team Agreement" card in Admin
console.log('🤝 Creating Team Agreement card...');
await window.Trello.post('/cards', {
  name: 'Define team agreement',
  desc: `**Team Agreement (10 minutes, do once)**
Fill this once. Set communication norms, meeting cadence, and decision rules.

---

## 1) Tools and where things live

* **Task tracker:** Trello (this board)
* **Files/live docs:** [Google Drive / Notion / Figma]
* **Team chat:** [WhatsApp / Telegram / Discord]
* **Rule:** Work links go on the Trello card (not buried in chat)

## 2) Communication norms

* **Response time:** within [12/24] hours on weekdays
* **If you're blocked:** comment on the card + tag @PM as soon as you know
* **Use card comments** for decisions/feedback (chat is for quick pings)

## 3) Meetings

* **Cadence:** [e.g., Mon + Thu, 30 mins]
* **If you can't attend:** leave an update on your card(s) before the meeting

## 4) Ownership and Definition of Done

* Every card has an owner (if unassigned, it's not started)
* A card is "Done" only when:
  * checklist is complete
  * deliverable link is attached (Figma/Doc/Slides)
  * any required handoff note is added

## 5) Decisions and conflict

* **Small decisions:** card owner decides after [12/24] hours for comments
* **Big decisions:** discuss as a group, then log it in the Decision Log card
* **If we disagree and time's tight:** PM makes the call, we document why

---

## Add-ons (optional, but helpful)

* One thing that stresses us in group projects: _____
* When someone is stuck, we want them to: _____
* Our quality bar for final submission is: _____

**Last updated:** [date]`,
  idList: listMap['Admin'],
  idLabels: [labelMap['Everyone']],
  pos: 'bottom',
  due: phaseDates['Admin'] || null  // ← ADD DUE DATE HERE!
});

    // Add checklist to Team Agreement card
    const checklistResponse = await window.Trello.post(`/cards/${teamAgreementCard.id}/checklists`, {
      name: 'Agreement setup'
    });

    const checklistItems = [
      'Fill in chat channel + file location',
      'Agree response time expectation',
      'Set meeting cadence',
      'Confirm Definition of Done rules',
      'Confirm decision rule (comment window)',
      'Add any team-specific add-ons',
      'PM: pin or star this card (so it stays findable)'
    ];

    for (const item of checklistItems) {
      await window.Trello.post(`/checklists/${checklistResponse.id}/checkItems`, {
        name: item
      });
    }

    if (phaseDates['Admin']) {
      await window.Trello.post(`/cards/${teamAgreementCard.id}`, {
        due: phaseDates['Admin']
      });
    }

    // 8. Create Decision Log card
console.log('📋 Creating Decision Log card...');
await window.Trello.post('/cards', {
  name: '📋 Decision Log',
  desc: `# Decision Log

Track major decisions here to maintain context.

## Format:
**Decision:** What did we decide?
**Date:** When?
**Rationale:** Why?
**Alternatives:** What else did we consider?
**Impact:** What does this affect?

---

## Example:

**Decision:** Use Figma for all design work
**Date:** Jan 15, 2026
**Rationale:** Team already familiar, good for collaboration, free for students
**Alternatives:** Adobe XD, Sketch
**Impact:** All designers need Figma accounts

---

## Your Decisions:

(Add yours below)`,
  idList: listMap['Admin'],
  pos: 'bottom',
  due: phaseDates['Admin'] || null  // ← ADD DUE DATE HERE!
});

    // 9. Invite team members if provided
    if (teamEmails && teamEmails.trim()) {
      console.log('📧 Inviting team members...');
      const emails = teamEmails.split(',').map(e => e.trim()).filter(Boolean);
      
      for (const email of emails) {
        try {
          await window.Trello.post(`/boards/${boardId}/members`, {
            email: email,
            type: 'normal'
          });
          console.log('✅ Invited:', email);
        } catch (error) {
          console.warn('⚠️ Could not invite:', email, error);
        }
      }
    }

    console.log('🎉 Board creation complete!');

    return {
      boardId,
      boardUrl,
      boardName: projectName || 'UX Project Board',
      listsCreated: phases.length,
      cardsCreated: cards.length + 3, // +3 for Read me, Team Agreement, Decision Log
      labelsCreated: labels.length
    };

  } catch (error) {
    console.error('❌ Error creating board:', error);
    throw error;
  }
};
