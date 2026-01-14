interface QuestionHeaderProps {
  currentStep: number;
  totalSteps?: number;
}

export const QuestionHeader = ({ currentStep, totalSteps = 6 }: QuestionHeaderProps) => {
  return (
    <div className="w-full max-w-[600px] mx-auto px-4 mb-12">
      <div className="text-center">

      </div>
    </div>
  );
};
