import type { FC } from "react";
import type { Card as CardType } from "../../../../server/src/Schema/Card";
import { Text } from "@react-three/drei";
import type { Euler, ThreeEvent, Vector3 } from "@react-three/fiber";

type CardPropsFaceUp = {
  faceUp: true;
  card: CardType;
};

type CardPropsFaceDown = {
  faceUp: false;
  card?: never;
};

export type CardProps = {
  position: Vector3;
  rotation: Euler;
  onClick?: (e: ThreeEvent<MouseEvent>) => void;
} & (CardPropsFaceDown | CardPropsFaceUp);

export const Card: FC<CardProps> = ({
  position,
  card,
  rotation,
  onClick,
  faceUp = true,
}) => {
  return (
    <mesh
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
      position={position}
      rotation={rotation}
    >
      <Text
        fontSize={16}
        color="black"
        anchorX={70}
        textAlign="left"
        position={[0, 90, 0]}
      >
        {faceUp && card?.name}
      </Text>
      <planeGeometry args={[150, 210]} />
      <meshStandardMaterial color={"#6CB4EE"} />
    </mesh>
  );
};
