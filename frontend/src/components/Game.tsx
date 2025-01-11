import { ScreenSizer } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState, type FC } from "react";
import { Mesh } from "three";
import { useGame } from "../hooks/useColyseus"
import { Card } from "./3DModels/Card"
import { Hand } from "./Hand"

const IDEAL_WIDTH = 1920;

const resize = () => {
  const { innerWidth } = window;
  const scale = innerWidth / IDEAL_WIDTH;

  return scale;
};

export const Game: FC = () => {
  const [scale, setScale] = useState(resize());

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
        <ambientLight intensity={Math.PI / 3} />
        <spotLight
          position={[0, 0, Number.MAX_SAFE_INTEGER]}
          angle={1}
          penumbra={1}
          decay={0}
          intensity={Math.PI / 2}
        />
        <Hand /> 
      </ScreenSizer>
    </Canvas>
  );
};

function Box(props: {
  position: [number, number, number];
  cube: "left" | "right";
}) {
  // This reference will give us direct access to the mesh
  const meshRef = useRef<Mesh>(null);
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (meshRef.current!.rotation.x += delta));
  // Return view, these are regular three.js elements expressed in JSX

  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[50, 50, 50]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}
