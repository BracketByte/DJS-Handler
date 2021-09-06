const { MessageEmbed } = require("discord.js");

deleteUnwantedProps = (permissions, defaultSet) => {
	let objectKeys = Object.keys(permissions);
	for (let i = 0; i < objectKeys.length; i++) {
		if (!defaultSet.includes(objectKeys[i])) {
			delete permissions[objectKeys[i]];
		}
	}
	return permissions;
};

validatePerms = async (user, permissions, types) => {
	let result = {
		unknownPerms: [],
		unavailablePerms: [],
	};
	permissions.forEach((permission) => {
		if (!permissionsList.includes(permission)) {
			result.unknownPerms.push(permission);
		}
		if (types.includes("unavailablePerms") && !user.hasPermission(permission)) {
			result.unavailablePerms.push(permission);
		}
	});
	return result;
};

sendPermsErrors = async (problems, sendMessage) => {
	if (problems.bot.unavailablePerms.includes("SEND_MESSAGES")) {
	} else if (problems.bot.unavailablePerms.includes("EMBED_LINKS")) {
		returnMsg = `This bot requires access to display embeds in order to function properly! `;
		if (problems.bot.unavailablePerms.length > 1) {
			returnMsg += `It also requires ${problems.bot.unavailablePerms.map(
				(perm) => (perm != "EMBED_LINKS" ? `\`${perm}\`` : null)
			)} for this specific command. Set the specific permissions and try again`;
		}
		sendMessage.send(returnMsg);
	} else {
		returnMsg = await new MessageEmbed()
			.setTitle("**MISSING PERMISSIONS**")
			.setDescription("There are unmet permissions requirements!")
			.setColor("#FF0000");
		if (problems.bot.unavailablePerms.length != 0) {
			returnMsg.addField(
				"Unmet bot permissions:",
				problems.bot.unavailablePerms.join(" | ")
			);
		}
		if (problems.user.unavailablePerms.length != 0) {
			returnMsg.addField(
				"Unmet user permissions:",
				problems.user.unavailablePerms.join(" | ")
			);
		}
		sendMessage.send(returnMsg);
	}
};

logPermsProblems = (result, commandName) => {
	let returnMsg = `Unknown permissions detected in command "${commandName}"!\n`;
	if (result.bot.unknownPerms.length > 0) {
		returnMsg += "\nUnknown bot permissions:";
		for (let i = 0; i < result.bot.unknownPerms.length; i++)
			returnMsg += `    ${result.bot.unknownPerms[i]}`;
	}
	if (result.user.unknownPerms.length > 0) {
		returnMsg += "\nUnknown user permissions:";
		for (let i = 0; i < result.user.unknownPerms.length; i++)
			returnMsg += `    ${result.user.unknownPerms[i]}`;
	}
	returnMsg += "\n";
	console.log(returnMsg);
};

onMessagePermissionCheck = async (client, message, command) => {
	let typeSets = { users: ["bot", "user"], perms: ["unavailablePerms"] },
		user = await message.guild.members.cache.get(message.author.id),
		bot = await message.guild.members.cache.get(client.user.id),
		result = {};

	let permissions = await deleteUnwantedProps(
		command.permissions,
		typeSets.users
	);

	if (!permissions.bot.includes("SEND_MESSAGES"))
		permissions.bot.push("SEND_MESSAGES");
	if (!permissions.bot.includes("EMBED_LINKS"))
		permissions.bot.push("EMBED_LINKS");

	if (permissions.user.constructor == Array) {
		result.user = await deleteUnwantedProps(
			await validatePerms(user, permissions.user, typeSets.perms),
			typeSets.perms
		);
	}
	if (permissions.bot.constructor == Array) {
		result.bot = await deleteUnwantedProps(
			await validatePerms(bot, permissions.bot, typeSets.perms),
			typeSets.perms
		);
	}

	if (
		result.bot.unavailablePerms.length == 0 &&
		result.user.unavailablePerms.length == 0
	) {
		return true;
	} else {
		sendPermsErrors(result, message.channel);
		return false;
	}
};

onInitPermissionCheck = async (client, command) => {
	let typeSets = { users: ["bot", "user"], perms: ["unknownPerms"] },
		bot = await client.users.cache.find((user) => user.id === client.user.id),
		result = {};
	let permissions = await deleteUnwantedProps(
		command.permissions,
		typeSets.users
	);

	if (permissions.user.constructor == Array) {
		result.user = await deleteUnwantedProps(
			//? user permissions validation is permitted with bot here as it only tests for the existance of a permission in the permission list
			await validatePerms(bot, permissions.user, typeSets.perms),
			typeSets.perms
		);
	}
	if (permissions.bot.constructor == Array) {
		result.bot = await deleteUnwantedProps(
			await validatePerms(bot, permissions.bot, typeSets.perms),
			typeSets.perms
		);
	}
	if (
		result.bot.unknownPerms.length == 0 &&
		result.user.unknownPerms.length == 0
	) {
		return true;
	} else {
		logPermsProblems(result, command.name);
		return false;
	}
};

module.exports = { onMessagePermissionCheck, onInitPermissionCheck };

permissionsList = [
	"CREATE_INSTANT_INVITE",
	"KICK_MEMBERS",
	"BAN_MEMBERS",
	"ADMINISTRATOR",
	"MANAGE_CHANNELS",
	"MANAGE_GUILD",
	"ADD_REACTIONS",
	"VIEW_AUDIT_LOG",
	"PRIORITY_SPEAKER",
	"STREAM",
	"VIEW_CHANNEL",
	"SEND_MESSAGES",
	"SEND_TTS_MESSAGES",
	"MANAGE_MESSAGES",
	"EMBED_LINKS",
	"ATTACH_FILES",
	"READ_MESSAGE_HISTORY",
	"MENTION_EVERYONE",
	"USE_EXTERNAL_EMOJIS",
	"VIEW_GUILD_INSIGHTS",
	"CONNECT",
	"SPEAK",
	"MUTE_MEMBERS",
	"DEAFEN_MEMBERS",
	"MOVE_MEMBERS",
	"USE_VAD",
	"CHANGE_NICKNAME",
	"MANAGE_NICKNAMES",
	"MANAGE_ROLES",
	"MANAGE_WEBHOOKS",
	"MANAGE_EMOJIS",
];
