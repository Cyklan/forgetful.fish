import type { FC } from "react";
import { useGame } from "../hooks/useColyseus";
import { startGameAction } from "../actions/StartGame";

export const BaseGameState: FC = () => {
  const { state } = useGame();

  if (state === null) {
    return;
  }

  return (
    state.isLobbyHost &&
    !state.gameHasStarted && (
      <button onClick={() => startGameAction()}>Start Game</button>
    )
  );
};
