utils =
{
	userById:async function(uid,msg)
	{
		return new Promise(async function(resolve, reject){
			if(msg!=null)
			{
				if(msg.guild)
				{
					guild = msg.guild;
				}
				else
				{
					guild = null;
				}
			}
			user = "unknown";
			if(guild)
			{
				usertemp = await guild.members.cache.get(uid);
			}
			else
			{
				usertemp = null;
			}
			if(!usertemp)
			{
				user = await msg.client.users.fetch(uid);
				user = user.tag;
			} else
			{
				user = usertemp.displayName + " ("+usertemp.user.tag+")";
			}

			resolve(user);

		});
	}

}
module.exports = utils;
