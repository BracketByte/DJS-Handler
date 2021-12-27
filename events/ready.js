const fs = require("fs");

module.exports = {
  event: "ready",
  once: true,
  execute(client) {
    console.log("Bot ready");

    //handle all interactions after the bot is online so you have access to guild id's
    fs.readdir("./interactions/", (err, files) => {
      const interactionsHandler = require("./../handler/interactionHandler");
      interactionsHandler(err, files, client);
    });
  },
};
