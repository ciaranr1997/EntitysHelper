const { Command } = require('discord.js-commando');
const config = require("../../config.json");
const utils = require("../../utils.js");
const Discord = require('discord.js');
const fs = require('fs');

module.exports = class ArtistCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'artist',
			group: 'bot',
			memberName: 'artist',
			description: 'Credits the artist who designed the logo',
			throttling: {
        usages: 2,
        duration: 60
	    },
		});
	}
	async run(message) {
		utils.userById(config.artist,message).then(function(artist)
		{
			message.reply("The artist who created the logo for this bot is "+artist).catch((error) => {

			});
		});
	}
};
