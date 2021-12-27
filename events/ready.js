const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

module.exports = {
  event: "ready",
  once: true,
  run(client) {
    const rest = new REST({ version: "9" }).setToken(
      "OTExMTMxMzIwMDExMzM3NzI4.YZc7Kg.zsyprVrfCdJk6SY4HRaKDVkXs1E"
    );
    if (client.commandList)
      (async () => {
        try {
          console.log("Refreshing slash command list");
          const guild_ids = await client.guilds.cache.map((guild) => guild.id);
          const client_id = await client.user.id;

          guild_ids.forEach(async (guild_id) => {
            await rest.put(
              Routes.applicationGuildCommands(client_id, guild_id),
              {
                body: client.commandList,
              }
            );
          });

          console.log("Successfully refreshed slash (/) commands.");
        } catch (error) {
          console.error(error);
        }
      })();

    console.log("Bot ready");
  },
};
