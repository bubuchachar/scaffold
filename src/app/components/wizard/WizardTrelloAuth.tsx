import { Trello, Lock, Check, X, ArrowLeft, ArrowRight, AlertCircle } from "lucide-react";
import { Button } from "../ui/button";
import { WizardHeader } from "./WizardHeader";
import { motion } from "motion/react";
import { useState } from "react";
import { authorizeTrello } from "../../utils/trelloService";

interface WizardTrelloAuthProps {
  onBack?: () => void;
  onAuthorize?: () => void;
  wizardState?: {
    projectName: string;
    roles: string[];
    teamEmails: string;
    deadline?: Date;
    intensity?: string;
    additionalOptions?: string[];
    workspace?: string;
  };
}

export const WizardTrelloAuth = ({ 
  onBack, 
  onAuthorize,
  wizardState 
}: WizardTrelloAuthProps) => {
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuthorize = async () => {
    setIsAuthorizing(true);
    setError(null);

    try {
      // Save wizard state BEFORE auth
      if (wizardState) {
        localStorage.setItem('scaffold_wizard_state', JSON.stringify(wizardState));
      }
      
      await authorizeTrello();
      
      // Auth successful!
      if (onAuthorize) {
        onAuthorize();
      }
    } catch (err) {
      console.error('Authorization error:', err);
      setError('Failed to authorize with Trello. Please try again.');
      setIsAuthorizing(false);
    }
  };

  return (
    // ... rest of your component stays the same
  );
};
