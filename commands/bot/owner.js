const { Command } = require('discord.js-commando');
const config = require("../../config.json");
const Discord = require('discord.js');
const fs = require('fs');


module.exports = class OwnerCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'owner',
			group: 'bot',
			memberName: 'owner',
			aliases:["contact","creator"],
			description: 'List come information about the owner of the bot',
			throttling: {
        usages: 2,
        duration: 60
	    },
		});
	}
	async run(message) {

		utils.userById(config.owner,message).then(function(owner)
		{
			message.reply("The owner of the bot is "+owner+" :).\n If you like you can contact him through the official discord: "+config.discord);
		});
	}
};
