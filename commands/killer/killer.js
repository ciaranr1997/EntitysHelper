const { Command } = require('discord.js-commando');
const config = require("../../config.json");
const Discord = require('discord.js');
const fs = require('fs');
let sql = require("../../sql.js");
sql.connect();

module.exports = class KillerCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'killer',
			group: 'killer',
			memberName: 'killer',
			description: 'List the basic killer information',
			throttling: {
        usages: 2,
        duration: 60
	    },
		});
	}
	async run(message) {
		var killer = message.content.replace("!killer ","");
		if(killer == ""||killer =="!killer")
		{
			message.reply("Please provide a killer name");
			return;
		}
		let rows = await sql.syncQuery("select * from dbd_killers WHERE killer_name LIKE ? OR known_as LIKE ?",["%"+killer+"%","%"+killer+"%"]);
		let perks = await sql.syncQuery("select * from dbd_perks WHERE owner LIKE ?",["%"+rows[0].killer_name+"%"]);


		if(rows.length==0)
		{
			message.reply("Sorry, I couldn't find that killer");
			return;
		}
		var desc = rows[0].killer_desc;
		if(desc.length>1000)
		{
			desc = desc.substring(0,1000);
			desc = desc+"...";
		}
		var power = rows[0].killer_power_desc;

		if(power.length>1000)
		{
			power = power.substring(0,1000);
			power = power+"...";
		}
		var embed = new Discord.MessageEmbed ()
		.setTitle(rows[0].killer_name)
		.setDescription(desc)
		.attachFiles([{name: "image.png", attachment:'./icons/'+rows[0].image_path}])
		.setThumbnail('attachment://image.png')
		.addFields({
			"name": rows[0].killer_power,
			"value": power
		},
		{
			"name":"Perks",
			"value":perks[0].perk_name+","+perks[1].perk_name+","+perks[2].perk_name+","
		});
		message.channel.send(embed).catch((error) => {
			message.author.send(embed).catch();
		});
	}
};
