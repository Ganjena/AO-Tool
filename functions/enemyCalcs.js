const Build = require(`../models/buildSchema.js`);
const Enemy = require(`../models/enemySchema.js`)


// calculate the enemies power
async function calcEnemyPower(id){
	const enemy = await Enemy.findById(id);
	let maxPowerUsed = 0;
	let minPowerUsed = 0;
	let maxPowerProduced = 0;
	let minPowerProduced = 0;
	let likleyPowerProduced = 0;
	let likleyPowerUsed = 0;
	
	// depending if PPE is active change power produced amounts.
	if (enemy.ppeActive === 1){
		enemy.buildings.powerplant.power = 4500;
		enemy.buildings.advancedPowerplant.power = 22500;
	} else if (enemy.ppeActive === 0){
		enemy.buildings.powerplant.power = 3000;
		enemy.buildings.advancedPowerplant.power = 15000;
	}

	for (let key of Object.keys(enemy.buildings)){
		if(key == `powerplant` || key == `advancedPowerplant`){
			maxPowerProduced += enemy.buildings[key].power*enemy.buildings[key].maxAmount;
			minPowerProduced += enemy.buildings[key].power*enemy.buildings[key].minAmount;
			likleyPowerProduced += enemy.buildings[key].power*enemy.buildings[key].minAmount*1.17;
		}else{
			maxPowerUsed += enemy.buildings[key].power*enemy.buildings[key].maxAmount;
			minPowerUsed += enemy.buildings[key].power*enemy.buildings[key].minAmount;
			likleyPowerUsed += enemy.buildings[key].power*enemy.buildings[key].minAmount*1.17;
		}
	}
	// update database with power stats, hardcoded power if power produced is ever 0 otherwise it breaks code
	if(maxPowerProduced === 0){
		enemy.stats.maxPower = 9999;
	}else{
		enemy.stats.maxPower = Math.ceil((maxPowerUsed/minPowerProduced)*100);
	}
	if(minPowerProduced === 0){
		enemy.stats.minPower = 9999;
	}else{
		enemy.stats.minPower = Math.ceil(minPowerUsed/maxPowerProduced*100);
	}
	if(likleyPowerProduced === 0){
		enemy.stats.likleyPower = 9999;
	}else{
		// random hardcode of 150 to make accurate
		enemy.stats.likleyPower = Math.ceil(likleyPowerUsed/likleyPowerProduced*100);
	}
	await enemy.save();
}

	// take enemy input from user and add it to the database
    async function updateEnemy(id, enemySetup){
        const enemy = await Enemy.findById(id);
        for (let group of Object.keys(enemySetup)){
            if(group === `seaUnits`){
                for (unit of Object.keys(enemySetup[group])){
                    if (enemySetup[group][unit].minAmount && enemySetup[group][unit].maxAmount){
                        enemy.units[group][unit].minAmount = enemySetup[group][unit].minAmount;
                        enemy.units[group][unit].maxAmount = enemySetup[group][unit].maxAmount;
                    }
                }
            }else if (group === `airUnits`){
                for (unit of Object.keys(enemySetup[group])){
                    if (enemySetup[group][unit].minAmount && enemySetup[group][unit].maxAmount){
                        enemy.units[group][unit].minAmount = enemySetup[group][unit].minAmount;
                        enemy.units[group][unit].maxAmount = enemySetup[group][unit].maxAmount;
                    }
                }
            }else if (group === `vehUnits`){
                for (unit of Object.keys(enemySetup[group])){
                    if (enemySetup[group][unit].minAmount && enemySetup[group][unit].maxAmount){
                        enemy.units[group][unit].minAmount = enemySetup[group][unit].minAmount;
                        enemy.units[group][unit].maxAmount = enemySetup[group][unit].maxAmount;
                    }
                }
            }else if (group === `infUnits`){
                for (unit of Object.keys(enemySetup[group])){
                    if (enemySetup[group][unit].minAmount && enemySetup[group][unit].maxAmount){
                        enemy.units[group][unit].minAmount = enemySetup[group][unit].minAmount;
                        enemy.units[group][unit].maxAmount = enemySetup[group][unit].maxAmount;
                    }
                }
            }else if (group === `buildings`){
                    for (unit of Object.keys(enemySetup[group])){
                        if (enemySetup[group][unit].minAmount && enemySetup[group][unit].maxAmount){
                            enemy[group][unit].minAmount = enemySetup[group][unit].minAmount;
                            enemy[group][unit].maxAmount = enemySetup[group][unit].maxAmount;
                        }
                    }
            }else if (group === `land`){
                    if (enemySetup.land.amount){
                        enemy.land = enemySetup.land.amount;
                    }
            }else {
                if (group === `ppeActive`){
                    if (enemySetup.ppeActive){
                        enemy.ppeActive = enemySetup.ppeActive;
                    }
                }
            }
        }
        await enemy.save();
    };

    //calculate enemy land
async function calcEnemyLand(id){
	const enemy = await Enemy.findById(id);
	const {buildings, stats, land} = enemy;
	// add up min/max amounts of buildings
	let minBuildings = 0;
	let maxBuildings = 0
	for (let type of Object.keys(buildings)){
		minBuildings += buildings[type].minAmount;
		maxBuildings += buildings[type].maxAmount;
	}
	//do calculations and add them to database
	stats.minBuildings = minBuildings;
	stats.maxBuildings = maxBuildings;
	stats.likleyBuildings = Math.ceil((stats.minBuildings*1.17));
	stats.minFreeLand = Math.ceil(land - (stats.maxBuildings*20));
	stats.maxFreeLand = Math.ceil(land - (stats.minBuildings*20));
	stats.likleyFreeLand = Math.ceil(land - (stats.likleyBuildings*20));
	await enemy.save()
}

//calculates enemy AP in defense
async function calcEnemyDef(id){
	const enemy = await Enemy.findById(id);
	const buildings = enemy.buildings;
	const units = enemy.units;
	let maxVsSea = 0;
	let minVsSea = 0;
	let maxVsAir = 0;
	let minVsAir = 0;
	let maxVsVeh = 0;
	let minVsVeh = 0;
	let maxVsInf = 0;
	let minVsInf = 0;
	//add attack power from buildings vs units
	for (let type of Object.keys(buildings)){
		if(buildings[type].targets.includes(`Sea`))
		{
			maxVsSea += buildings[type].maxAmount*buildings[type].attack;
			minVsSea += buildings[type].minAmount*buildings[type].attack;
		}
		if(buildings[type].targets.includes(`Air`))
		{
			maxVsAir += buildings[type].maxAmount*buildings[type].attack;
			minVsAir += buildings[type].minAmount*buildings[type].attack;
		}
		if(buildings[type].targets.includes(`Veh`))
		{
			maxVsVeh += buildings[type].maxAmount*buildings[type].attack;
			minVsVeh += buildings[type].minAmount*buildings[type].attack;
		}
		if(buildings[type].targets.includes(`Inf`))
		{
			maxVsInf += buildings[type].maxAmount*buildings[type].attack;
			minVsInf += buildings[type].minAmount*buildings[type].attack;
		}
	}
	// add attack power vs all unit type from all units
	for (let group of Object.keys(units)){
		if (group === `seaUnits`){
			for (let type of Object.keys(units[group])){
				if(units[group][type].targets.includes(`Sea`))
				{
					maxVsSea += units[group][type].maxAmount*units[group][type].attack;
					minVsSea += units[group][type].minAmount*units[group][type].attack;
				}
				if(units[group][type].targets.includes(`Air`))
				{
					maxVsAir += units[group][type].maxAmount*units[group][type].attack;
					minVsAir += units[group][type].minAmount*units[group][type].attack;
				}
				if(units[group][type].targets.includes(`Veh`))
				{
					maxVsVeh += units[group][type].maxAmount*units[group][type].attack;
					minVsVeh += units[group][type].minAmount*units[group][type].attack;
				}
				if(units[group][type].targets.includes(`Inf`))
				{
					maxVsInf += units[group][type].maxAmount*units[group][type].attack;
					minVsInf += units[group][type].minAmount*units[group][type].attack;
				}
			}
		}
		if (group === `airUnits`){
			for (let type of Object.keys(units[group])){
				if(units[group][type].targets.includes(`Sea`))
				{
					maxVsSea += units[group][type].maxAmount*units[group][type].attack;
					minVsSea += units[group][type].minAmount*units[group][type].attack;
				}
				if(units[group][type].targets.includes(`Air`))
				{
					maxVsAir += units[group][type].maxAmount*units[group][type].attack;
					minVsAir += units[group][type].minAmount*units[group][type].attack;
				}
				if(units[group][type].targets.includes(`Veh`))
				{
					maxVsVeh += units[group][type].maxAmount*units[group][type].attack;
					minVsVeh += units[group][type].minAmount*units[group][type].attack;
				}
				if(units[group][type].targets.includes(`Inf`))
				{
					maxVsInf += units[group][type].maxAmount*units[group][type].attack;
					minVsInf += units[group][type].minAmount*units[group][type].attack;
				}
			}
		}
		if (group === `vehUnits`){
			for (let type of Object.keys(units[group])){
				if(units[group][type].targets.includes(`Sea`))
				{
					maxVsSea += units[group][type].maxAmount*units[group][type].attack;
					minVsSea += units[group][type].minAmount*units[group][type].attack;
				}
				if(units[group][type].targets.includes(`Air`))
				{
					maxVsAir += units[group][type].maxAmount*units[group][type].attack;
					minVsAir += units[group][type].minAmount*units[group][type].attack;
				}
				if(units[group][type].targets.includes(`Veh`))
				{
					maxVsVeh += units[group][type].maxAmount*units[group][type].attack;
					minVsVeh += units[group][type].minAmount*units[group][type].attack;
				}
				if(units[group][type].targets.includes(`Inf`))
				{
					maxVsInf += units[group][type].maxAmount*units[group][type].attack;
					minVsInf += units[group][type].minAmount*units[group][type].attack;
				}
			}
		}
		if (group === `infUnits`){
			for (let type of Object.keys(units[group])){
				if(units[group][type].targets.includes(`Sea`))
				{
					maxVsSea += units[group][type].maxAmount*units[group][type].attack;
					minVsSea += units[group][type].minAmount*units[group][type].attack;
				}
				if(units[group][type].targets.includes(`Air`))
				{
					maxVsAir += units[group][type].maxAmount*units[group][type].attack;
					minVsAir += units[group][type].minAmount*units[group][type].attack;
				}
				if(units[group][type].targets.includes(`Veh`))
				{
					maxVsVeh += units[group][type].maxAmount*units[group][type].attack;
					minVsVeh += units[group][type].minAmount*units[group][type].attack;
				}
				if(units[group][type].targets.includes(`Inf`))
				{
					maxVsInf += units[group][type].maxAmount*units[group][type].attack;
					minVsInf += units[group][type].minAmount*units[group][type].attack;
				}
			}
		}
	}
	enemy.attackStats.againstSea.maxAmount = maxVsSea;
	enemy.attackStats.againstSea.minAmount = minVsSea;
	enemy.attackStats.againstSea.likleyAmount = Math.ceil(minVsSea*1.17);

	enemy.attackStats.againstAir.maxAmount = maxVsAir;
	enemy.attackStats.againstAir.minAmount = minVsAir;
	enemy.attackStats.againstAir.likleyAmount = Math.ceil(minVsAir*1.17);

	enemy.attackStats.againstVeh.maxAmount = maxVsVeh;
	enemy.attackStats.againstVeh.minAmount = minVsVeh;
	enemy.attackStats.againstVeh.likleyAmount = Math.ceil(minVsVeh*1.17);

	enemy.attackStats.againstInf.maxAmount = maxVsInf;
	enemy.attackStats.againstInf.minAmount = minVsInf;
	enemy.attackStats.againstInf.likleyAmount = Math.ceil(minVsInf*1.17);

	await enemy.save();
};

module.exports = {
    calcEnemyPower,
    updateEnemy,
    calcEnemyLand,
    calcEnemyDef
}