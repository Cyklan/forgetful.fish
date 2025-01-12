import type { FC } from "react";
import { useGame } from "../../hooks/useColyseus";

const phaseNames = [
  "Beginning",
  "Main Phase 1",
  "Combat",
  "Main Phase 2",
  "End Phase",
];

export const NextPhaseButton: FC = () => {
  const { state } = useGame();
  return (
    <button className="NextPhase">
      Go to {phaseNames[state!.currentPhase + 1]}
    </button>
  );
};
