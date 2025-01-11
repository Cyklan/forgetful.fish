import type { FC } from "react";
import { useGame } from "../hooks/useColyseus";
import type { Euler, Vector3 } from "@react-three/fiber";
import { Card } from "./3DModels/Card";

export const Hand: FC = () => {
  const { me } = useGame();

  const hand = me()?.hand;
  if (!hand) {
    return null;
  }

  const rotationsAndPositions = calculateRotationsAndPositions(hand.length);

  const cards = hand.map((card, i) => (
    <Card
      key={card.id}
      position={rotationsAndPositions[i]!.position}
      rotation={rotationsAndPositions[i]!.rotation}
      card={card}
    />
  ));

  return <object3D position={[0, -400, 0]}>{cards}</object3D>;
};

function calculateCenterIndices(length: number): number[] {
  const hasDefinitiveCenter = length % 2 === 1;
  if (hasDefinitiveCenter) {
    return [Math.floor(length / 2)];
  }

  return [Math.floor(length / 2), Math.ceil(length / 2)];
}

const rotationOffset = -4;
const positionXOffset = 100;
const depthOffset = 2;
function calculateRotationsAndPositions(length: number): {
  rotation: Euler;
  position: Vector3;
}[] {
  const rotationsAndPositions: { rotation: Euler; position: Vector3 }[] = [];

  const centers = calculateCenterIndices(length);
  if (centers.length === 1) {
    const center = centers[0]!;
    for (let i = 0; i < length; i++) {
      const distanceFromCenter = i - center;
      const rotation = distanceFromCenter * rotationOffset;
      rotationsAndPositions.push({
        rotation: [0, 0, (rotation * Math.PI) / 180],
        position: [
          distanceFromCenter * positionXOffset,
          Math.pow(Math.abs(distanceFromCenter), 2) * -5,
          depthOffset * i - length,
        ],
      });
    }
  } else {
  }

  return rotationsAndPositions;
}
