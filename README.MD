# Command and Event Handler For Discord.js!

Simple and easy to use command and event handler
with useful features.

## INFO

**!** The command handler used in this repository is based on the official discord.js command handler

**!** Make sure that you have Node.js and NPM installed and up to to date on your system

## HOW DO I START THE BOT?

**1** Create a new file in the root of the directory of the project called `.env` and write in it `TOKEN=your_token_goes_here`

**2** set your prefix in `utils/config.json`

**3** run `npm install` then `npm run start` in your terminal

**4** next time you want to start the bot just run `npm run start`

## HOW TO ADD NEW COMMANDS?

**1:** Create a new .js file in the commands folder with the name of your command.

**2:** Populate the file with the code reprezented here:

```js
module.exports = {
	name: 'commanad name',
	description: 'description of your command',
	aliases: ['aleas1', 'alias2'],
	guildOnly: false, //true if only used in server
	args: false, //true if the command cant run without arguments
	usage: '[argument1] [argument2]',
	execute: async (message, args, client) => {
		//code for the command goes here
	},
};
```

**3:** start your bot and see if it works!
