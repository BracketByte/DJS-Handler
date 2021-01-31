module.exports = {
	name: 'test',
	description: 'Just a test command',
	aliases: [],
	guildOnly: false,
	args: false,
	usage: '',
	execute:(message, args, client) => {
		message.reply('this is the test command');
	},
};