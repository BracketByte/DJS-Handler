const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("Just a test command"),
  async execute(interaction) {
    await interaction.reply("this is the test command");
  },
};
