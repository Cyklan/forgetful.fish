import config from "@colyseus/tools";
import { monitor } from "@colyseus/monitor";
import { playground } from "@colyseus/playground";
import { DandanRoom } from "./Rooms/DandanRoom";

export default config({
  initializeGameServer: (gameServer) => {
    gameServer.define("dandan", DandanRoom);
  },

  initializeExpress: (app) => {
    app.get("/hello_world", (req, res) => {
      res.send("It's time to kick ass and chew bubblegum!");
    });

    if (process.env.NODE_ENV !== "production") {
      app.use("/", playground);
    }

    /**
     * Use @colyseus/monitor
     * It is recommended to protect this route with a password
     * Read more: https://docs.colyseus.io/tools/monitor/#restrict-access-to-the-panel-using-a-password
     */
    app.use("/colyseus", monitor());
  },

  beforeListen: () => {},
});
