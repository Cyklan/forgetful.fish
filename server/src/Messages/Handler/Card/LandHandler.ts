import { match } from "ts-pattern";
import { Handler, MessageHandlerFunction } from "../Handler";
import { LandPlayMessage } from "../../card/LandPlayMessage";
import { getPlayerByClientId } from "../../../util/getPlayerByClientId";
import { ArraySchema } from "@colyseus/schema";
import { LandTapMessage } from "../../card/LandTapMessage";
import { Land } from "../../../Schema/Land";
import { Mana } from "../../../Schema/Mana";

export const LandActions = {
  play: "play",
  tap: "tap",
  untap: "untap",
} as const;

export class LandHandler extends Handler {
  handleMessage: MessageHandlerFunction = (client, message) => {
    const player = getPlayerByClientId(this.room, client.sessionId);
    match(message.action)
      .with(LandActions.play, () => {
        if (player.hasPlayedLand) {
          return;
        }
        const playMessage = message as typeof LandPlayMessage;
        const playedLand = player.hand.find(
          (card) => card.id === playMessage.args.id
        ) as Land;
        if (!playedLand) {
          return;
        }
        player.hand = new ArraySchema(
          ...player.hand.filter((card) => card.id !== playedLand.id)
        );
        player.lands.push(playedLand);
        player.hasPlayedLand = true;
        player.updateCardsInHand();
      })
      .with(LandActions.tap, () => {
        const tapMessage = message as typeof LandTapMessage;
        const land = tapMessage.args;
        const landToTap = player.lands.find(
          (playedLand) => playedLand.id === land.id
        );

        if (!landToTap || landToTap.isTapped) {
          return;
        }
        const manaToAdd = land.produces.map(mapManaAmount).flat();

        player.manaPool.push(...manaToAdd);
        landToTap.produced = new ArraySchema(...manaToAdd);
        landToTap.isTapped = true;
      })
      .with(LandActions.untap, () => {
        const tapMessage = message as typeof LandTapMessage;
        const land = tapMessage.args;
        const landToUntap = player.lands.find(
          (playedLand) => playedLand.id === land.id
        );
        if (!landToUntap?.isTapped) {
          return;
        }

        if (
          player.manaPool.findIndex(
            (mana) => mana.producedBy === landToUntap.id
          ) === -1
        ) {
          return;
        }

        for (let i = 0; i < landToUntap.produced.length; i++) {
          const index = player.manaPool.findIndex(
            (mana) => mana.producedBy === landToUntap.produced[i].producedBy
          );
          if (index === -1) {
            continue;
          }
          player.manaPool.splice(index, 1);
        }

        landToUntap.isTapped = false;
      });
  };
}

const mapManaAmount = (mana: Mana) => {
  const addableMana = [];
  for (let i = 0; i < mana.amount; i++) {
    addableMana.push(new Mana(mana.color, 1, mana.producedBy));
  }

  return addableMana;
};
