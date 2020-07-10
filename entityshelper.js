/***********************
******SETUP STUFF*******
***********************/
const Discord = require('discord.js');
//const client = new Discord.Client();
const config = require("./config.json");
const { CommandoClient } = require('discord.js-commando');
const path = require('path');

const client = new CommandoClient({
	commandPrefix: '!',
	owner: '187262396237217792',
	unknownCommandResponse: false,
});


client.registry
	.registerDefaultTypes()
	.registerGroups([
		['shrine', 'Shrine Related Commands'],
		['perk', 'Perk Related Commands'],
		['killer', 'Killer Related Commands']

	])
	.registerDefaultGroups()
	.registerDefaultCommands({unknownCommand: false})
	.registerCommandsIn(path.join(__dirname, 'commands'));



client.login(config.token);
client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
	client.user.setActivity('Dead By Daylight');
});
