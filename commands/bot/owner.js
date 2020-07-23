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
			description: 'List some information about the owner of the bot',
			throttling: {
        usages: 2,
        duration: 60
	    },
		});
	}
	async run(message) {


	}
};
