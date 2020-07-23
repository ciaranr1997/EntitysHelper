const { Command } = require('discord.js-commando');
const config = require("../../config.json");
const Discord = require('discord.js');
const fs = require('fs');

module.exports = class SourceCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'source',
			group: 'bot',
			memberName: 'source',
			description: 'Links to the github',
			aliases:["code","github","sourcecode"],
			throttling: {
        usages: 2,
        duration: 60
	    },
		});
	}
	async run(message) {
		message.reply("If you would like to see the source code for this bot it is available at:\n https://github.com/ciaranr1997/EntitysHelper").catch((error) => {

		});
	}
};
