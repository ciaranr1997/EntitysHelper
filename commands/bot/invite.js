const { Command } = require('discord.js-commando');
const config = require("../../config.json");
const Discord = require('discord.js');
const fs = require('fs');

module.exports = class InviteCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'invite',
			group: 'bot',
			memberName: 'invite',
			description: 'Provides the invite link for the bot',
			throttling: {
        usages: 2,
        duration: 60
	    },
		});
	}
	async run(message) {
		message.reply("If you would like this bot in your server you can invite it via: \n\nhttps://discord.com/oauth2/authorize?client_id=730869461006942360&permissions=379904&scope=bot\n\n(Please note you need admin to do this)").catch((error) => {

		});
	}
};
