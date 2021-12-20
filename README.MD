# Command and Event Handler For Discord.js!

Simple and easy to use command and event handler
with useful features.

## INFO

**!** The command handler used in this repository is based on the official discord.js command handler

**!** Make sure that you have Node.js and NPM installed and up to to date on your system

## HOW DO I SETUP MY BOT?

**!** If you'r hosting the bot on your loca machine create a new file in the root of the directory of the project called `.env` and write in it `TOKEN=your_token_goes_here` if not, add the token to your bot environtment variables with the name of `TOKEN`

**!** Set your prefix in `utils/config.json`

**!** Run `npm install` in your terminal

## HOW DO I START THE BOT?

**!** If it's not your first time running this bot, run `npm run start` in your terminal

**!** Use `npm run LocalStart` in your terminal if you'r running the bot on a local machine to make use of the .env file

## HOW TO ADD NEW COMMANDS?

**1** Create a new .js file in the commands folder with the name of your command.

**2** Populate the file with the code reprezented here:

```js
module.exports = {
	name: 'commanad name',
	description: 'description of your command',
	aliases: ['aleas1', 'alias2'],
	usage: '[argument1] [argument2]',
	guildOnly: false, //true if only used in server
	args: false, //true if the command cant run without arguments
	permissions: {
		bot: [], //permissions that the bot requires for the command
		user: [], //permissions that the user requires for the command
	},
	execute: async (message, args, client) => {
		//code for the command goes here
	},
};
```

**3** start your bot and see if it works!
