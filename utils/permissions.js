const { MessageEmbed } = require('discord.js');

let commandHasPermissions = (user, bot, permsObj) => {
	let result = {
			bot: {
				faultyPerms: [],
				unavailablePerms: [],
			},
			user: {
				faultyPerms: [],
				unavailablePerms: [],
			},
		},
		hasPerms = (perms, user, userType) => {
			perms.forEach((permission) => {
				if (!permissionsList.includes(permission)) {
					result[userType].faultyPerms.push(permission);
				} else if (!user.hasPermission(permission)) {
					result[userType].unavailablePerms.push(permission);
				}
			});
		};
	if (permsObj.bot.constructor == Array && permsObj.user.constructor == Array) {
		hasPerms(permsObj.bot, bot, 'bot');
		hasPerms(permsObj.user, user, 'user');
	}
	return result;
};

let botPermissionCheck = async (sendChannel, user, bot, perms, commandName) => {
	if (!perms.bot.includes('SEND_MESSAGES')) perms.bot.push('SEND_MESSAGES');
	if (!perms.bot.includes('EMBED_LINKS')) perms.bot.push('EMBED_LINKS');
	let returnMsg,
		result = await commandHasPermissions(user, bot, perms);

	if (result.bot.faultyPerms || result.user.faultyPerms)
		console.log(`Unrecognized permission:`);
	if (result.bot.faultyPerms)
		console.log(
			`The folowing permissions for the bot don't exist:\n${result.bot.faultyPerms.map(
				(perm) => perm
			)}`
		);
	if (result.user.faultyPerms)
		console.log(
			`The folowing permissions for the user don't exist:\n${result.user.faultyPerms.map(
				(perm) => perm
			)}`
		);

	if (result.bot.unavailablePerms && result.user.unavailablePerms) {
		if (result.bot.unavailablePerms.includes('SEND_MESSAGES')) {
			return false;
		} else if (result.bot.unavailablePerms.includes('EMBED_LINKS')) {
			returnMsg = `This bot requires access to display embeds in order to function properly! It also requires ${result.bot.unavailablePerms.map(
				(perm) => (perm != 'EMBED_LINKS' ? `\`${perm}\`` : null)
			)} for this specific command. Set the specific permissions and try again`;
			sendChannel.send(returnMsg);
			return false;
		} else {
			returnMsg = await new MessageEmbed()
				.setTitle('**MISSING PERMISSIONS**')
				.setDescription('There are unmet permissions requirements!')
				.setColor('#FF0000');
			if (result.bot.unavailablePerms.length != 0) {
				returnMsg.addField(
					'Unmet bot permissions:',
					result.bot.unavailablePerms.join(' | ')
				);
			}
			if (result.user.unavailablePerms.length != 0) {
				returnMsg.addField(
					'Unmet user permissions:',
					result.user.unavailablePerms.join(' | ')
				);
			}
			sendChannel.send(returnMsg);
			return false;
		}
		return false;
	} else {
		if (result.bot.faultyPerms || result.user.faultyPerms)
			console.log(`Unrecognized permission:`);
		if (result.bot.faultyPerms)
			console.log(
				`The folowing permissions for the bot don't exist:\n${result.bot.unavailablePerms.map(
					(perm) => perm
				)}`
			);
		if (result.user.faultyPerms)
			console.log(
				`The folowing permissions for the user don't exist:\n${result.user.unavailablePerms.map(
					(perm) => perm
				)}`
			);
		return true;
	}
};

permissionsList = [
	'CREATE_INSTANT_INVITE',
	'KICK_MEMBERS',
	'BAN_MEMBERS',
	'ADMINISTRATOR',
	'MANAGE_CHANNELS',
	'MANAGE_GUILD',
	'ADD_REACTIONS',
	'VIEW_AUDIT_LOG',
	'PRIORITY_SPEAKER',
	'STREAM',
	'VIEW_CHANNEL',
	'SEND_MESSAGES',
	'SEND_TTS_MESSAGES',
	'MANAGE_MESSAGES',
	'EMBED_LINKS',
	'ATTACH_FILES',
	'READ_MESSAGE_HISTORY',
	'MENTION_EVERYONE',
	'USE_EXTERNAL_EMOJIS',
	'VIEW_GUILD_INSIGHTS',
	'CONNECT',
	'SPEAK',
	'MUTE_MEMBERS',
	'DEAFEN_MEMBERS',
	'MOVE_MEMBERS',
	'USE_VAD',
	'CHANGE_NICKNAME',
	'MANAGE_NICKNAMES',
	'MANAGE_ROLES',
	'MANAGE_WEBHOOKS',
	'MANAGE_EMOJIS',
];

module.exports = { botPermissionCheck };
