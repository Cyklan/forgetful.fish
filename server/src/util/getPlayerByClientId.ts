import { Room } from "colyseus";
import { GameState } from "schema";

export const getPlayerByClientId = (
  room: Room<GameState>,
  clientId: string
) => {
  if (room.state.player1.sessionId === clientId) {
    return room.state.player1;
  }

  return room.state.player2;
};
