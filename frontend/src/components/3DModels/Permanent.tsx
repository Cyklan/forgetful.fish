import type { FC } from "react";
import { Text } from "@react-three/drei";
import type { Creature } from "../../../../server/src/Schema/Creature";
import type { Land } from "../../../../server/src/Schema/Land";

export type PermanentProps = {
  card: Land | Creature;
  positionOffset?: number;
  onClick?: () => void;
};

const WIDTH = 120;

export const Permanent: FC<PermanentProps> = ({
  card,
  positionOffset = 0,
  onClick,
}) => {
  return (
    <mesh
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      rotation={[0, 0, card.isTapped ? -0.2 : 0]}
      position={[positionOffset * WIDTH + positionOffset * 20, 0, 0]}
    >
      <Text
        anchorX={50}
        textAlign="left"
        fontSize={12}
        position={[0, 35, 5]}
        color="black"
      >
        {card.name}
      </Text>
      <boxGeometry args={[WIDTH, 90, 5]} />
      <meshStandardMaterial color="#D0D0D0" />
    </mesh>
  );
};
