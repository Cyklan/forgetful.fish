import { ScreenSizer } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState, type FC } from "react";
import { Hand } from "./Hand";
import { Lands } from "./Lands";
import { useGame } from "../hooks/useColyseus";

const IDEAL_WIDTH = 1920;

const resize = () => {
  const { innerWidth } = window;
  const scale = innerWidth / IDEAL_WIDTH;

  return scale;
};

export const Game: FC = () => {
  const [scale, setScale] = useState(resize());
  const { me, opponent } = useGame();

  const updateScale = () => {
    setScale(resize);
  };

  useEffect(() => {
    window.addEventListener("resize", updateScale);

    return () => {
      window.removeEventListener("resize", updateScale);
    };
  }, []);

  return (
    <Canvas className="game">
      <ScreenSizer scale={scale}>
        <ambientLight intensity={Math.PI} />
        <Hand whos="opponent" />
        <Lands whos="opponent" lands={opponent()?.lands.toArray() ?? []} />
        <Hand whos="mine" />
        <Lands whos="mine" lands={me()?.lands.toArray() ?? []} />
      </ScreenSizer>
    </Canvas>
  );
};
