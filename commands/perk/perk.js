const { Command } = require('discord.js-commando');
const config = require("../../config.json");
const Discord = require('discord.js');
const fs = require('fs');

let sql = require("../../sql.js");
sql.connect();
module.exports = class PerkCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'perk',
			group: 'perk',
			memberName: 'perk',
			description: 'Get the mentioned perk',
			throttling: {
        usages: 2,
        duration: 60
	    },
		});
	}
	async run(message) {
		var perk = message.content.replace("!perk ","");
		if(perk == ""||perk =="!perk")
		{
			message.reply("Please provide a perk name");
			return;
		}
		getDetails(perk,message);
	}
};
async function getDetails(perk,message)
{

	let rows = await sql.syncQuery("select * from dbd_perks WHERE perk_name LIKE ? OR known_as LIKE ?",["%"+perk+"%","%"+perk+"%"]);
	if(rows.length==0)
	{
		message.reply("Sorry, I was not able to find that perk :(");
		return;
	}
	for(i=0;i<rows.length;i++)
	{

		var description = rows[i].description.replace(/"/g,"_");
		var levelAvailable = rows[i].levelavailable;
		var image = rows[i].icon;
		var embed = new Discord.MessageEmbed ()
		.setTitle(rows[i].perk_name)
		.setDescription(description)
		.attachFiles([{name: "image.png", attachment:'./icons/'+image}])
		.setThumbnail('attachment://image.png');
		if(rows[i].teachable==1)
		{
			embed.addFields({
				"name": "From",
				"value": rows[i].owner,
				inline:true
			},
			{
				"name": "Level",
				"value": rows[i].levelavailable,
				inline:true
			});
		}
		message.channel.send(embed).catch((error) => {

		});
	}

}
