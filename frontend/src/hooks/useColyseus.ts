import { Client, Room } from "colyseus.js";
import { create } from "zustand";
import { SERVER_URL } from "astro:env/client";
import type { GameState } from "../../../server/src/Schema/GameState";
import type { Player } from "../../../server/src/Schema/Player";

export type ColyseusState = {
  client: Client;
  room?: Room<GameState>;
  state: GameState | null;
  join: () => Promise<void>;
  me: () => Player | undefined;
};

export const useGame = create<ColyseusState>((set, get) => ({
  client: new Client(SERVER_URL),
  join: async () => {
    const currentState = get();
    if (currentState.room) {
      return;
    }

    const room = await currentState.client.joinOrCreate<GameState>("dandan");
    room.onStateChange((state) => set({ state }));

    set({ room });
  },
  state: null,
  me: () => {
    return get().state?.isLobbyHost ? get().state?.player1 : get().state?.player2
  }
}));
