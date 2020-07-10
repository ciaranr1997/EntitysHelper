const { Command } = require('discord.js-commando');
const axios = require("axios");
const scraper = require('table-scraper')
const config = require("../../config.json");

let sql = require("../../sql.js");
sql.connect();
module.exports = class ShrineCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'shrine',
			group: 'shrine',
			memberName: 'shrine',
			description: 'Get the current shrine',
		});
	}
	async run(message) {
		scraper.get(config.url).then(async function(data)
		{
			var shrinetable = data[0];
			var shrine = [];
			shrine[0] = getDetails(shrinetable[0],message);
			shrine[1] = getDetails(shrinetable[1],message);
			shrine[2] = getDetails(shrinetable[2],message);
			shrine[3] = getDetails(shrinetable[3],message);

		});

	}
};
async function getDetails(obj,message)
{
	details =
	{
		"refreshes":Object.keys(obj)[0],
		"perk":obj[Object.keys(obj)[0]],
		"cost":Object.keys(obj)[1].replace("_4",""),
		"character":obj[Object.keys(obj)[1]]
	};

	rows = await sql.syncQuery("select * from dbd_perks WHERE perk_name LIKE '%"+details.perk+"%'");
	details.description = rows[0].description;
	details.levelAvailable = rows[0].levelavailable;
	var embed = {
		"embed": {
			"title": details.perk,
			"description": details.description,
			"color": 980195,
			"fields": [
				{
					"name": "From",
					"value": details.character,
					inline:true
				},
				{
					"name": "Level",
					"value": details.levelAvailable,
					inline:true
				},
			]
		}
	}
	message.say(embed);
}
