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
		['killer', 'Killer Related Commands'],
		['bot', 'Information about the bot']

	])
	.registerDefaultGroups()
	.registerDefaultCommands({unknownCommand: false})
	.registerCommandsIn(path.join(__dirname, 'commands'));



client.login(config.token);
client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
	client.user.setActivity('Dead By Daylight');
});

//do some stuff when the bot joins a server
client.on('guildCreate', async guild => {
	user = await client.users.fetch(config.owner);

	user.send("The bot has joined the server \""+guild.name+"\"\nThe server is owned by "+guild.owner.user.username+"#"+guild.owner.user.discriminator);

	//send a welcome message to the first channel I can speak in
	let defaultChannel = "";
	guild.channels.cache.forEach((channel) => {
	  if(channel.type == "text" && defaultChannel == "") {
	    if(channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
	      defaultChannel = channel;
	    }
	  }
	});
	defaultChannel.send("Hi there!\nThanks for inviting me to your server. \n\nIf you would like to see the commands available type "+client.commandPrefix+"help at any time");
});
