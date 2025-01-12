import type { FC } from "react";
import { useGame } from "../hooks/useColyseus";
import type { Euler, Vector3 } from "@react-three/fiber";
import { Card } from "./3DModels/Card";
import { getCardAction } from "../actions/util/getCardAction";

export type HandProps = {
  whos: "mine" | "opponent";
};

const positions = {
  mine: [0, -400, 0],
  opponent: [0, 400, 0],
} as const;

export const Hand: FC<HandProps> = ({ whos }) => {
  const { me, opponent } = useGame();

  const hand =
    whos === "mine"
      ? me()?.hand
      : (Array.from({ length: opponent()?.cardsInHand ?? 0 }).fill(
          ""
        ) as string[]);
  if (!hand && whos === "mine") {
    return null;
  }

  const rotationsAndPositions = calculateRotationsAndPositions(
    hand?.length ?? 0
  );

  const cards = hand?.map((card, i) => (
    //@ts-ignore
    <Card
      key={typeof card === "string" ? `opponent-hand-card-${i}` : card.id}
      faceUp={whos === "mine"}
      position={rotationsAndPositions[i]!.position}
      rotation={rotationsAndPositions[i]!.rotation}
      card={typeof card === "string" ? void 0 : card}
      onClick={
        typeof card === "string"
          ? undefined
          : () => getCardAction(card, "hand")?.()
      }
    />
  ));

  return (
    <object3D
      rotation={[0, 0, whos === "mine" ? 0 : Math.PI]}
      position={positions[whos]}
    >
      {cards}
    </object3D>
  );
};

function calculateCenterIndices(length: number): number[] {
  const hasDefinitiveCenter = length % 2 === 1;
  if (hasDefinitiveCenter) {
    return [Math.floor(length / 2)];
  }

  return [length / 2 - 1, length / 2];
}

const rotationOffset = -4;
const positionXOffset = 100;
const depthOffset = 2;
function calculateRotationsAndPositions(length: number): {
  rotation: Euler;
  position: Vector3;
}[] {
  const rotationsAndPositions: { rotation: Euler; position: Vector3 }[] = [];

  const isEven = length % 2 === 0;
  const centers = calculateCenterIndices(length);
  const center = isEven ? (centers[0]! + centers[1]!) / 2 : centers[0]!;
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

  return rotationsAndPositions;
}
