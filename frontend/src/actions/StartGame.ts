import { useGame } from "../hooks/useColyseus"
import { StartGameMessage } from "communication"

export const startGameAction = () => {
  useGame.getState().room?.send("*", StartGameMessage)
}