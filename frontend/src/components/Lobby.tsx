import { useEffect, type FC } from "react";
import { useGame } from "../hooks/useColyseus";
import { BaseGameState } from "./BaseGameState";
import { Game } from "./Game";

export const Lobby: FC = () => {
  const { join, state, room } = useGame();

  useEffect(() => {
    join();
  }, []);

  return (
    <div>
      {state ? (
        <div>
          {room!.roomId}
          <br />
          Players joined: {!state.player2.sessionId ? 1 : 2}
          <br />
          <BaseGameState />
          {state.gameHasStarted && <Game />}
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
};
