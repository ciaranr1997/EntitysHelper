const { Command } = require('discord.js-commando');
const axios = require("axios");
const scraper = require('table-scraper')
const config = require("../../config.json");
const Discord = require('discord.js');

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
	var details =
	{
		"refreshes":Object.keys(obj)[0],
		"perk":obj[Object.keys(obj)[0]],
		"cost":Object.keys(obj)[1].replace("_4",""),
		"character":obj[Object.keys(obj)[1]]
	};

	rows = await sql.syncQuery("select * from dbd_perks WHERE perk_name LIKE '%"+details.perk+"%'");
	details.description = rows[0].description.replace(/"/g,"_");
	details.levelAvailable = rows[0].levelavailable;
	details.image = rows[0].icon;
	var embed = new Discord.MessageEmbed ()
	.setTitle(details.perk)
	.setDescription(details.description)
	.attachFiles([{name: "image.png", attachment:'./icons/'+details.image}])
	.setThumbnail('attachment://image.png')
	.addFields({
		"name": "From",
		"value": details.character,
		inline:true
	},
	{
		"name": "Level",
		"value": details.levelAvailable,
		inline:true
	});
	message.channel.send(embed);

}
