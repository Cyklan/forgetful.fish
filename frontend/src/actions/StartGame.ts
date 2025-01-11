import { useGame } from "../hooks/useColyseus"
import { StartGameMessage } from "../../../server/src/Messages/general/startGame"

export const startGameAction = () => {
  useGame.getState().room?.send("*", StartGameMessage)
}