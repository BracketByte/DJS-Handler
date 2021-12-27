const Discord = require("discord.js");
const { prefix, colors } = require("./../utils/config.json");
const embedColor = colors.default;
const embedError = colors.error;

module.exports = {
  name: "help",
  description: "Get help on how to use the bot and the specific commands",
  aliases: ["?", "h"],
  usage: "[command name]",
  guildOnly: false,
  args: false,
  slash: true,
  permissions: {
    bot: [],
    user: [],
  },
  execute: async (message, args, client) => {
    const { commands } = message.client;

    if (!args.length) {
      const cmdHelpEmbed = new Discord.MessageEmbed()
        .setTitle("**HELP**")
        .setDescription(
          `Command list: \n\`${commands
            .map((command) => command.name)
            .join(
              " | "
            )}\`\nYou can use \`${prefix}help {command name}\` to get info about a specific command!`
        )
        .setColor(embedColor);
      return message.channel.send({
        embeds: [cmdHelpEmbed],
      });
    }

    const name = args[0].toLowerCase();
    const command =
      commands.get(name) ||
      commands.find((cmd) => cmd.aliases && cmd.aliases.includes(name));

    if (!command) {
      const cmdDoesntExist = new Discord.MessageEmbed()
        .setTitle("Command not found!")
        .setDescription(
          'Command "' +
            message.args[0] +
            "\" doesn't exist!\nUse `" +
            prefix +
            "help` for list of all commands."
        )
        .setColor(embedError);
      return message.channel.send({
        embeds: [cmdDoesntExist],
      });
    }
    const cmdHelpEmbed = new Discord.MessageEmbed()
      .setTitle(`${command.name} | Command info`)
      .setDescription(command.description)
      .addField("Usage", `\`${prefix + command.name} ${command.usage}\``, true)
      .setColor(embedColor);

    if (command.aliases) {
      cmdHelpEmbed.addField(
        "Aliases",
        `\`${command.aliases.join(" | ")}\``,
        true
      );
    }

    return message.channel.send({ embeds: [cmdHelpEmbed] });
  },
};
