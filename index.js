const fs = require('fs');

const Discord = require('discord.js');
const client = new Discord.Client({ intents: ['GUILDS', "GUILD_MESSAGES"] });

const config = require('./utils/config.json')

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir('./events/', (err, files) => {
	const eventHandler = require('./handler/eventHandler.js');
	eventHandler(err, files, client);
});
fs.readdir('./commands/', (err, files) => {
	const commandHandler = require('./handler/commandHandler.js');
	commandHandler(err, files, client);
});

client.login(config.token);