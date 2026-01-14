import { LandingPage } from "./components/landing/LandingPage";
import { StyleGuide } from "./components/style-guide/StyleGuide";
import { WizardStep2 } from "./components/wizard/WizardStep2";
import { WizardStep3 } from "./components/wizard/WizardStep3";
import { WizardStep4 } from "./components/wizard/WizardStep4";
import { WizardStep5 } from "./components/wizard/WizardStep5";
import { WizardStep6 } from "./components/wizard/WizardStep6";
import { WizardPreview } from "./components/wizard/WizardPreview";
import { WizardTrelloAuth } from "./components/wizard/WizardTrelloAuth";
import { WizardLoading } from "./components/wizard/WizardLoading";
import { WizardSuccess } from "./components/wizard/WizardSuccess";
import { WizardError } from "./components/wizard/WizardError";
import { useState } from "react";
import { Button } from "./components/ui/button";

type View = "landing" | "styleguide" | "wizard-2" | "wizard-3" | "wizard-4" | "wizard-5" | "wizard-6" | "preview" | "trello-auth" | "loading" | "success" | "error";

// Wizard state interface
interface WizardState {
  projectName: string;
  deadline: Date | undefined;
  roles: string[];
  intensity: string;
  additionalOptions: string[];
  teamEmails: string;
  workspace: string;
}

// Board creation result interface
interface BoardData {
  boardUrl: string;
  boardName: string;
  boardId: string;
  listsCreated: number;
  cardsCreated: number;
}

function App() {
  const [currentView, setCurrentView] = useState<View>("landing"); 
  
  // Wizard state management
  const [wizardState, setWizardState] = useState<WizardState>({
    projectName: "",
    deadline: undefined,
    roles: [],
    intensity: "",
    additionalOptions: [],
    teamEmails: "",
    workspace: "My Workspace"
  });
  
  // Board creation result
  const [boardData, setBoardData] = useState<BoardData | null>(null);
  
  // Update wizard state helper
  const updateWizardState = (updates: Partial<WizardState>) => {
    setWizardState(prev => ({ ...prev, ...updates }));
  };
  
  // Handler for starting wizard from landing page
  const handleStartWizard = (projectName: string) => {
    updateWizardState({ projectName });
    setCurrentView("wizard-2");
  };

  return (
    <div>
      {/* Dev Tools Hidden */}

      {currentView === "landing" && <LandingPage onStart={handleStartWizard} />}
      {currentView === "styleguide" && <StyleGuide />}
      {currentView === "wizard-2" && (
        <WizardStep2 
          initialDate={wizardState.deadline}
          onNext={(date) => {
            updateWizardState({ deadline: date });
            setCurrentView("wizard-3");
          }} 
          onBack={() => setCurrentView("landing")} 
        />
      )}
      {currentView === "wizard-3" && (
        <WizardStep3 
          initialRoles={wizardState.roles}
          onNext={(roles) => {
            updateWizardState({ roles });
            setCurrentView("wizard-4");
          }} 
          onBack={() => setCurrentView("wizard-2")} 
        />
      )}
      {currentView === "wizard-4" && (
        <WizardStep4 
          initialIntensity={wizardState.intensity}
          onNext={(intensity) => {
            updateWizardState({ intensity });
            setCurrentView("wizard-5");
          }} 
          onBack={() => setCurrentView("wizard-3")} 
        />
      )}
      {currentView === "wizard-5" && (
        <WizardStep5 
          initialOptions={wizardState.additionalOptions}
          onNext={(options) => {
            updateWizardState({ additionalOptions: options });
            setCurrentView("wizard-6");
          }} 
          onBack={() => setCurrentView("wizard-4")} 
        />
      )}
      {currentView === "wizard-6" && (
        <WizardStep6 
          initialEmails={wizardState.teamEmails}
          onNext={(emails) => {
            updateWizardState({ teamEmails: emails });
            setCurrentView("preview");
          }} 
          onBack={() => setCurrentView("wizard-5")} 
        />
      )}
      {currentView === "preview" && (
        <WizardPreview 
          projectName={wizardState.projectName}
          workspace={wizardState.workspace}
          roles={wizardState.roles}
          onNext={() => setCurrentView("trello-auth")} 
          onBack={() => setCurrentView("wizard-6")} 
        />
      )}
      {currentView === "trello-auth" && (
        <WizardTrelloAuth 
          onBack={() => setCurrentView("preview")}
          onAuthorize={() => setCurrentView("loading")}
        />
      )}
      {currentView === "loading" && (
        <WizardLoading 
          projectName={wizardState.projectName}
          roles={wizardState.roles}
          teamEmails={wizardState.teamEmails}
          onComplete={(result) => {
            setBoardData(result);
            setCurrentView("success");
          }}
          onError={() => setCurrentView("error")}
        />
      )}
      {currentView === "success" && boardData && (
        <WizardSuccess 
          boardUrl={boardData.boardUrl}
          boardName={boardData.boardName}
          cardsCreated={boardData.cardsCreated}
        />
      )}
      {currentView === "error" && <WizardError />}
    </div>
  );
}

export default App;
