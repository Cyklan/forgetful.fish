import type { FC } from "react"
import type { Card as CardType } from "../../../../server/src/Schema/Card"
import { Text } from "@react-three/drei"
import type { Euler, Vector3 } from "@react-three/fiber"

export type CardProps = {
  card: CardType;
  position: Vector3,
  rotation: Euler
}

export const Card: FC<CardProps> = ({ position, card, rotation }) => {
  return <mesh position={position} rotation={rotation}>
    <Text fontSize={16} color="black" anchorX={70} textAlign="left" position={[0, 90, 0]}>
      {card.name}
    </Text>
    <planeGeometry args={[150, 210]} />
    <meshStandardMaterial color={"#6CB4EE"} />
  </mesh>
}