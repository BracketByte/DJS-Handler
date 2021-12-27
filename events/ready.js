const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

module.exports = {
  event: "ready",
  once: true,
  execute(client) {
    console.log("Bot ready");
  },
};
