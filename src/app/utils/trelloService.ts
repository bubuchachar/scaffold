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
        scope: { read: string; write: string } | { read: boolean; write: boolean };
        expiration: string;
        return_url?: string;
        success: () => void;
        error: (error: Error) => void;
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
      expiration: 'never',  // Test if parameter works at all
      return_url: window.location.origin,
      success: () => {
        console.log('✅ Trello authorization successful');
        resolve(true);
      },
      error: (error: Error) => {
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
  teamEmails?: string
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

    // 2. Create Labels
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

    // 3. Create Lists (Phases)
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

    // 4. Create Cards
    console.log('🎴 Creating cards based on roles:', roles);
    const cards = assembleCards(roles);
    
    for (const card of cards) {
      const labelName = getCardLabel(card);
      const labelId = labelMap[labelName];
      
      await window.Trello.post('/cards', {
        name: card.title,
        desc: card.description,
        idList: listMap[card.phase],
        idLabels: labelId ? [labelId] : [],
        pos: 'bottom'
      });
    }
    console.log('✅ Cards created:', cards.length);

    // 5. Create "Read me first" card in Admin
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
      pos: 'top'
    });

    // 6. Create Decision Log card
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
      pos: 'bottom'
    });

    // 7. Invite team members if provided
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
      cardsCreated: cards.length + 2,
      labelsCreated: labels.length
    };

  } catch (error) {
    console.error('❌ Error creating board:', error);
    throw error;
  }
};
