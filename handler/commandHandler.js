const ascii = require("ascii-table");
const commandCheck = require("./../utils/commandCheck");
const { onInitPermissionCheck } = require("./../utils/permissions");
const table = new ascii().setHeading("command", "Load Status");

module.exports = (err, files, client) => {
	if (err) return console.error(err);

	files.forEach((file, index) => {
		const command = require(`./../commands/${file}`);
		if (commandCheck(command.name, command)) {
			if (command.name) {
				client.commands.set(command.name, command);
				table.addRow(command.name, "✔");
				if (command.aliases && Array.isArray(command)) {
					command.aliases.foreach((alias) =>
						client.aliases.set(alias, command.name)
					);
				}
				if (command.permissions) {
					if (!command.permissions.bot) command.permissions.bot = [];
					if (!command.permissions.user) command.permissions.user = [];
					onInitPermissionCheck(client, command);
				}
			} else {
				table.addRow(command.name, "✖");
			}
		}
		if (index == files.length - 1) console.log(table.toString());
	});
};
