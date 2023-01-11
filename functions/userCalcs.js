const Build = require(`../models/buildSchema.js`);
const Enemy = require(`../models/enemySchema.js`)

//updates units from unit pages
async function updateUnitsDb(update, group, type, id){
	const updateBuild = await Build.findById(id);
	for (let keys of Object.keys(update)){
		let num = parseInt(update[keys].amount);
		if(num){			
			updateBuild[group][type][keys].amount = num;
		} else {
			updateBuild[group][type][keys].amount = updateBuild[group][type][keys].amount;
		}
	}
	await updateBuild.save();
}
//updates DB from buildings page
async function updateBldMisDb(update, type, id){
	const updateBuild = await Build.findById(id);
	for (let keys of Object.keys(update)){
		let num = parseInt(update[keys].amount);
		if(num || num == 0){
			updateBuild[type][keys].amount = num;

		} else {
			updateBuild[type][keys].amount = updateBuild[type][keys].amount;
		}
	}
	await updateBuild.save();
}

// updates building and missile NW 
function calcNw(update){
	const build = update.buildings;
	const missile = update.missiles;
	const units = update.units;
	const sats = update.satellite;
	const research = update.research;
	let rawNw = 0;
	rawNw += 0.85*update.miscStat.land;

	//buildings first
	for (let key of Object.keys(build)){
		let price = build[key].price;
		let percent = build[key].nwAdded;
		let amount = build[key].amount;
		rawNw += price/100*percent*amount;
	}
	//missiles second
	for (let key of Object.keys(missile)){
		let price = missile[key].price;
		let percent = missile[key].nwAdded;
		let amount = missile[key].amount;
		rawNw += price/100*percent*amount;
	}
	//units third
	for (let group of Object.keys(units)){
		for (let type of Object.keys(units[group])){
			let price = units[group][type].price;
			let percent = units[group][type].nwAdded;
			let amount = units[group][type].amount;
			rawNw += price/100*percent*amount;
		}
	}

	//sats 4th
	for (let key of Object.keys(sats)){
		if (sats[key].amount === 1){
			let price = sats[key].price;
			let percent = sats[key].nwAdded;
			let amount = sats[key].amount;
			rawNw += price/100*percent*amount;
		}
	}
	
	//research 5th
	for (let key of Object.keys(research)){
		let level = research[key].level;
		let nw = research[key].nwAdded;
		let hours = research[key].hours;
		rawNw += nw*hours*level;
	}
	//round up to nearest whole number
	let totalNw = Math.ceil(rawNw, 1);
	return totalNw;
}

// calculate power

function calcPower(build){
	let powerUsed = 0;
	let powerProduced = 0;
	for (let key of Object.keys(build.buildings)){
		if(key == `powerplant` || key == `advancedPowerplant`){
			powerProduced += build.buildings[key].power*build.buildings[key].amount;
		}else{
			powerUsed += build.buildings[key].power*build.buildings[key].amount;
		}
	}
	// if power produced is 0 just return n/a
	if(powerProduced === 0){
		return 99999;
	}else{
		return Math.ceil(powerUsed/powerProduced*100)
	}

}

async function calcAttackPower(id){
	const build = await Build.findById(id);
	const units = build.units;
	let vsSea = 0;
	let vsAir = 0;
	let vsVeh = 0;
	let vsInf = 0;
	//checkes for all attack power vs units
	for (let group of Object.keys(units)){
		if (group === `seaUnits`){
			for (let type of Object.keys(units[group])){
				if(units[group][type].targets.includes(`Sea`))
				{	
					// add all AP that attacks sea units
					vsSea += units[group][type].amount*units[group][type].attack;
					if(units[group][type].targets.includes(`Bld`)){
							// add BK power of units to other attack types as they hit buildings so adds to total AP
							vsAir += units[group][type].amount*units[group][type].attack;
							vsVeh += units[group][type].amount*units[group][type].attack;
							vsInf += units[group][type].amount*units[group][type].attack;
					}
				}
				if(units[group][type].targets.includes(`Air`))
				{
					vsAir += units[group][type].amount*units[group][type].attack;
					if(units[group][type].targets.includes(`Bld`)){
						// add BK power of units to other attack types as they hit buildings so adds to total AP
						vsSea += units[group][type].amount*units[group][type].attack;
						vsVeh += units[group][type].amount*units[group][type].attack;
						vsInf += units[group][type].amount*units[group][type].attack;
				}
				}
				if(units[group][type].targets.includes(`Veh`))
				{
					vsVeh += units[group][type].amount*units[group][type].attack;
					if(units[group][type].targets.includes(`Bld`)){
						// add BK power of units to other attack types as they hit buildings so adds to total AP
						vsAir += units[group][type].amount*units[group][type].attack;
						vsSea += units[group][type].amount*units[group][type].attack;
						vsInf += units[group][type].amount*units[group][type].attack;
				}
				}
				if(units[group][type].targets.includes(`Inf`))
				{
					vsInf += units[group][type].amount*units[group][type].attack;
					if(units[group][type].targets.includes(`Bld`)){
						// add BK power of units to other attack types as they hit buildings so adds to total AP
						vsAir += units[group][type].amount*units[group][type].attack;
						vsVeh += units[group][type].amount*units[group][type].attack;
						vsSea += units[group][type].amount*units[group][type].attack;
				}
				}
				if(units[group][type].targets.includes(`Bld`))
				{
					if(units[group][type].targets.length === 1){
						vsSea += units[group][type].amount*units[group][type].attack;
						vsAir += units[group][type].amount*units[group][type].attack;
						vsVeh += units[group][type].amount*units[group][type].attack;
						vsInf += units[group][type].amount*units[group][type].attack;
					}
				}
			}
		}
		if (group === `airUnits`){
			for (let type of Object.keys(units[group])){
				if(units[group][type].targets.includes(`Sea`))
				{
					vsSea += units[group][type].amount*units[group][type].attack;
					if(units[group][type].targets.includes(`Bld`)){
						// add BK power of units to other attack types as they hit buildings so adds to total AP
						vsAir += units[group][type].amount*units[group][type].attack;
						vsVeh += units[group][type].amount*units[group][type].attack;
						vsInf += units[group][type].amount*units[group][type].attack;
				}
				}
				if(units[group][type].targets.includes(`Air`))
				{
					vsAir += units[group][type].amount*units[group][type].attack;
					if(units[group][type].targets.includes(`Bld`)){
						// add BK power of units to other attack types as they hit buildings so adds to total AP
						vsSea += units[group][type].amount*units[group][type].attack;
						vsVeh += units[group][type].amount*units[group][type].attack;
						vsInf += units[group][type].amount*units[group][type].attack;
				}
				}
				if(units[group][type].targets.includes(`Veh`))
				{
					vsVeh += units[group][type].amount*units[group][type].attack;
					if(units[group][type].targets.includes(`Bld`)){
						// add BK power of units to other attack types as they hit buildings so adds to total AP
						vsAir += units[group][type].amount*units[group][type].attack;
						vsSea += units[group][type].amount*units[group][type].attack;
						vsInf += units[group][type].amount*units[group][type].attack;
				}
				}
				if(units[group][type].targets.includes(`Inf`))
				{
					vsInf += units[group][type].amount*units[group][type].attack;
					if(units[group][type].targets.includes(`Bld`)){
						// add BK power of units to other attack types as they hit buildings so adds to total AP
						vsAir += units[group][type].amount*units[group][type].attack;
						vsVeh += units[group][type].amount*units[group][type].attack;
						vsSea += units[group][type].amount*units[group][type].attack;
				}
				}
				if(units[group][type].targets.includes(`Bld`))
				{
					if(units[group][type].targets.length === 1){
						vsSea += units[group][type].amount*units[group][type].attack;
						vsAir += units[group][type].amount*units[group][type].attack;
						vsVeh += units[group][type].amount*units[group][type].attack;
						vsInf += units[group][type].amount*units[group][type].attack;
					}
				}
			}
		}
		if (group === `vehUnits`){
			for (let type of Object.keys(units[group])){
				if(units[group][type].targets.includes(`Sea`))
				{
					vsSea += units[group][type].amount*units[group][type].attack;
					if(units[group][type].targets.includes(`Bld`)){
						// add BK power of units to other attack types as they hit buildings so adds to total AP
						vsAir += units[group][type].amount*units[group][type].attack;
						vsVeh += units[group][type].amount*units[group][type].attack;
						vsInf += units[group][type].amount*units[group][type].attack;
				}
				}
				if(units[group][type].targets.includes(`Air`))
				{
					vsAir += units[group][type].amount*units[group][type].attack;
					if(units[group][type].targets.includes(`Bld`)){
						// add BK power of units to other attack types as they hit buildings so adds to total AP
						vsSea += units[group][type].amount*units[group][type].attack;
						vsVeh += units[group][type].amount*units[group][type].attack;
						vsInf += units[group][type].amount*units[group][type].attack;
				}
				}
				if(units[group][type].targets.includes(`Veh`))
				{
					vsVeh += units[group][type].amount*units[group][type].attack;
					if(units[group][type].targets.includes(`Bld`)){
						// add BK power of units to other attack types as they hit buildings so adds to total AP
						vsAir += units[group][type].amount*units[group][type].attack;
						vsSea += units[group][type].amount*units[group][type].attack;
						vsInf += units[group][type].amount*units[group][type].attack;
				}
				}
				if(units[group][type].targets.includes(`Inf`))
				{
					vsInf += units[group][type].amount*units[group][type].attack;
					if(units[group][type].targets.includes(`Bld`)){
						// add BK power of units to other attack types as they hit buildings so adds to total AP
						vsAir += units[group][type].amount*units[group][type].attack;
						vsVeh += units[group][type].amount*units[group][type].attack;
						vsSea += units[group][type].amount*units[group][type].attack;
				}
				}
				if(units[group][type].targets.includes(`Bld`))
				{
					if(units[group][type].targets.length === 1){
						vsSea += units[group][type].amount*units[group][type].attack;
						vsAir += units[group][type].amount*units[group][type].attack;
						vsVeh += units[group][type].amount*units[group][type].attack;
						vsInf += units[group][type].amount*units[group][type].attack;
					}
				}
			}
		}
		if (group === `infUnits`){
			for (let type of Object.keys(units[group])){
				if(units[group][type].targets.includes(`Sea`))
				{
					vsSea += units[group][type].amount*units[group][type].attack;
					if(units[group][type].targets.includes(`Bld`)){
						// add BK power of units to other attack types as they hit buildings so adds to total AP
						vsAir += units[group][type].amount*units[group][type].attack;
						vsVeh += units[group][type].amount*units[group][type].attack;
						vsInf += units[group][type].amount*units[group][type].attack;
				}
				}
				if(units[group][type].targets.includes(`Air`))
				{
					vsAir += units[group][type].amount*units[group][type].attack;
					if(units[group][type].targets.includes(`Bld`)){
						// add BK power of units to other attack types as they hit buildings so adds to total AP
						vsSea += units[group][type].amount*units[group][type].attack;
						vsVeh += units[group][type].amount*units[group][type].attack;
						vsInf += units[group][type].amount*units[group][type].attack;
				}
				}
				if(units[group][type].targets.includes(`Veh`))
				{
					vsVeh += units[group][type].amount*units[group][type].attack;
					if(units[group][type].targets.includes(`Bld`)){
						// add BK power of units to other attack types as they hit buildings so adds to total AP
						vsAir += units[group][type].amount*units[group][type].attack;
						vsSea += units[group][type].amount*units[group][type].attack;
						vsInf += units[group][type].amount*units[group][type].attack;
				}
				}
				if(units[group][type].targets.includes(`Inf`))
				{
					vsInf += units[group][type].amount*units[group][type].attack;
					if(units[group][type].targets.includes(`Bld`)){
						// add BK power of units to other attack types as they hit buildings so adds to total AP
						vsAir += units[group][type].amount*units[group][type].attack;
						vsVeh += units[group][type].amount*units[group][type].attack;
						vsSea += units[group][type].amount*units[group][type].attack;
				}
				}
				if(units[group][type].targets.includes(`Bld`))
				{
					if(units[group][type].targets.length === 1){
						vsSea += units[group][type].amount*units[group][type].attack;
						vsAir += units[group][type].amount*units[group][type].attack;
						vsVeh += units[group][type].amount*units[group][type].attack;
						vsInf += units[group][type].amount*units[group][type].attack;
					}
				}
			}
		}
	}
	build.attackStats.againstSea = vsSea;
	build.attackStats.againstAir = vsAir;
	build.attackStats.againstVeh = vsVeh;
	build.attackStats.againstInf = vsInf;
	await build.save();
}

async function calcWinLoss(buildId, enemyId){
	const build = await Build.findById(buildId);
	const enemy = await Enemy.findById(enemyId);
	const {attackStats} = build;

	let defenceVsSea = 0;
	let defenceVsAir = 0;
	let defenceVsVeh = 0;
	let defenceVsInf = 0;

	let attackVsSea = 0;
	let attackVsAir = 0;
	let attackVsVeh = 0;
	let attackVsInf = 0;

	// reteives enemy attacking stats and adds 10%
	for (let key of Object.keys(enemy.attackStats)){
		if (key === `againstSea`)
		{
			defenceVsSea = enemy.attackStats[key].likleyAmount*1.1;
		}else if(key === `againstAir`)
		{
			defenceVsAir = enemy.attackStats[key].likleyAmount*1.1;
		}else if(key === `againstVeh`)
		{
			defenceVsVeh = enemy.attackStats[key].likleyAmount*1.1;
		}else if(key === `againstInf`)
		{
			defenceVsInf = enemy.attackStats[key].likleyAmount*1.1;
		}
	}

	// retrevies players attacking stats
	for (let key of Object.keys(attackStats)){
		if (key === `againstSea`)
		{
			attackVsSea = attackStats[key];
		}else if(key === `againstAir`)
		{
			attackVsAir = attackStats[key];
		}else if(key === `againstVeh`)
		{
			attackVsVeh = attackStats[key];
		}else if(key === `againstInf`)
		{
			attackVsInf = attackStats[key];
		}
	}

	//check if win or lose vs units types
	if (defenceVsSea === 0)
	{
		build.winLoss.againstSea = `-`;
	}
	else if(attackVsSea>defenceVsSea)
	{
		build.winLoss.againstSea = `WIN`;
	}
	else
	{
		build.winLoss.againstSea = `LOSE`;
	}

	if (defenceVsAir === 0)
	{
		build.winLoss.againstAir = `-`;
	}
	else if(attackVsSea>defenceVsAir)
	{
		build.winLoss.againstAir = `WIN`;
	}
	else
	{
		build.winLoss.againstAir = `LOSE`;
	}

	if (defenceVsVeh === 0)
	{
		build.winLoss.againstVeh = `-`;
	}
	else if(attackVsSea>defenceVsVeh)
	{
		build.winLoss.againstVeh = `WIN`;
	}
	else
	{
		build.winLoss.againstVeh = `LOSE`;
	}

		if (defenceVsInf === 0)
	{
		build.winLoss.againstInf = `-`;
	}
	else if(attackVsSea>defenceVsInf)
	{
		build.winLoss.againstInf = `WIN`;
	}
	else
	{
		build.winLoss.againstInf = `LOSE`;
	}


	await build.save();
	await enemy.save();
}

module.exports = {
    updateUnitsDb,
    updateBldMisDb,
    calcNw,
    calcPower,
    calcAttackPower,
    calcWinLoss
}