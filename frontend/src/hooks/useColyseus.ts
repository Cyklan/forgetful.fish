import { Client, Room } from "colyseus.js";
import { create } from "zustand";
import { SERVER_URL } from "astro:env/client";
import type { GameState, Player } from "schema";
export type ColyseusState = {
  client: Client;
  room?: Room<GameState>;
  state: GameState | null;
  join: () => Promise<void>;
  me: () => Player | undefined;
  opponent: () => Player | undefined;
};

export const useGame = create<ColyseusState>((set, get) => ({
  client: new Client(SERVER_URL),
  join: async () => {
    const currentState = get();
    if (currentState.room) {
      return;
    }

    const room = await currentState.client.joinOrCreate<GameState>("dandan");
    room.onStateChange((state) => {
      set({ state });
    });

    set({ room });
  },
  state: null,
  me: () => {
    return get().state?.isLobbyHost
      ? get().state?.player1
      : get().state?.player2;
  },
  opponent: () => {
    return get().state?.isLobbyHost
      ? get().state?.player2
      : get().state?.player1;
  },
}));
