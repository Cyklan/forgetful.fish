import type { FC } from "react";
import "./UI/ui.css"
import { NextPhaseButton } from "./UI/NextPhaseButton"
import { useGame } from "../hooks/useColyseus"

export const UILayer: FC = () => {
  const { me } = useGame()
  return <div className="game-ui">
    {me()?.isActivePlayer && <NextPhaseButton />}
  </div>;
};
