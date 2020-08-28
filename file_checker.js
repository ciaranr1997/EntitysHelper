let sql = require("./sql");
const fs = require('fs')
let path = "./icons/";
async function run()
{
	console.log("Checking all files exist")
	query = "SELECT * FROM dbd_perks";
	sql.connect();
	let rows = await sql.syncQuery(query);
	let count = 0;
	for(i=0;i<rows.length;i++)
	{
		if(!fs.existsSync(path+rows[i].icon))
		{
			console.log(rows[i].perk_name+" "+fs.existsSync(path+rows[i].icon));
			count++;
		}
	}
	console.log("Done");
	console.log("Found "+count+" issue(s)");
}

run();
