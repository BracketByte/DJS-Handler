const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const { colors } = require("./../utils/config.json");
const embedColor = colors.default;
const embedError = colors.error;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Get help on how to use the bot and the specific commands")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("Name the command you want help with!")
        .setRequired(false)
    ),
  async execute(interaction, client) {
    //await interaction.reply({ content: "work in progress!", ephemeral: true });
    const string = interaction.options.getString("name");

    if (!string) {
      const cmdHelpEmbed = new Discord.MessageEmbed()
        .setTitle("**HELP**")
        .setDescription(
          `Command list: \n\`${client.interactions
            .map((command) => command.data.name)
            .join(
              " | "
            )}\`\nYou can use \`/help {command name}\` to get info about a specific command!`
        )
        .setColor(embedColor);
      return interaction.reply({
        embeds: [cmdHelpEmbed],
      });
    }

    const command = client.interactions.get(string);

    if (!command) {
      const cmdDoesntExist = new Discord.MessageEmbed()
        .setTitle("Command not found!")
        .setDescription(
          `Command "${string}" doesn't exist! \nUse /help for list of all commands.`
        )
        .setColor(embedError);
      return interaction.reply({
        embeds: [cmdDoesntExist],
      });
    }

    const cmdHelpEmbed = new Discord.MessageEmbed()
      .setTitle(`${command.data.name} | Command info`)
      .setDescription(
        `Command name: **${command.data.name}**\n${command.data.description}`
      )
      .setColor(embedColor);

    return interaction.reply({ embeds: [cmdHelpEmbed] });
  },
};
