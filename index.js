const fs = require("fs");

const { Client, Intents, Collection } = require("discord.js");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.commands = new Collection();
client.aliases = new Collection();
client.interactions = new Collection();

fs.readdir("./commands/", async (err, files) => {
  const commandHandler = require("./handler/commandHandler");
  await commandHandler(err, files, client);
});

fs.readdir("./events/", (err, files) => {
  const eventHandler = require("./handler/eventHandler");
  eventHandler(err, files, client);
});

client.login(process.env.TOKEN);
