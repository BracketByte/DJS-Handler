module.exports = {
	name: "test",
	description: "Just a test command",
	aliases: [""],
	usage: "[command args]",
	guildOnly: false,
	args: false,
	permissions: {},
	execute: (message, args, client) => {
		message.reply("this is the test command");
	},
};
