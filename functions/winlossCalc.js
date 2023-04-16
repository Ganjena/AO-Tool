const Build = require(`../models/buildSchema.js`);
const Enemy = require(`../models/enemySchema.js`)

async function defenderUnitTypes(defenderId){
    const defender = await Enemy.findById(defenderId);
    // always have "Bld" type to start with...
    let defenderUnitTypes = ["Bld"];
    // work out what units types the defender has
    for (let group of Object.keys(defender.units)){
        for (let units of Object.keys(defender.units[group])){
            if (defender.units[group][units].minAmount > 0){
                if (group === "seaUnits"){
                    if (defenderUnitTypes.indexOf("Sea") === -1 ){
                        defenderUnitTypes.push("Sea")
                    }
                } else if (group === "airUnits"){
                    if (defenderUnitTypes.indexOf("Air") === -1 ){
                        defenderUnitTypes.push("Air")
                    }
                } else if  (group === "vehUnits"){
                    if (defenderUnitTypes.indexOf("Veh") === -1 ){
                        defenderUnitTypes.push("Veh")
                    }
                } else if (group === "infUnits"){
                    if (defenderUnitTypes.indexOf("Inf") === -1 ){
                        defenderUnitTypes.push("Inf")
                    }
                } 
            }
        }
    }
    return defenderUnitTypes;
}

async function attackerUnitTypes(attackerId){
    const attacker = await Build.findById(attackerId);
    // always have "Bld" type to start with...
    let attackerUnitTypes = [];
    // work out what units types the defender has
    for (let group of Object.keys(attacker.units)){
        for (let units of Object.keys(attacker.units[group])){
            if (attacker.units[group][units].amount > 0){
                if (group === "seaUnits"){
                    if (attackerUnitTypes.indexOf("Sea") === -1 ){
                        attackerUnitTypes.push("Sea")
                    }
                } else if (group === "airUnits"){
                    if (attackerUnitTypes.indexOf("Air") === -1 ){
                        attackerUnitTypes.push("Air")
                    }
                } else if  (group === "vehUnits"){
                    if (attackerUnitTypes.indexOf("Veh") === -1 ){
                        attackerUnitTypes.push("Veh")
                    }
                } else if (group === "infUnits"){
                    if (attackerUnitTypes.indexOf("Inf") === -1 ){
                        attackerUnitTypes.push("Inf")
                    }
                } 
            }
        }
    }
    return attackerUnitTypes;
}

async function attackerUnitTargets(attackerId){
    const attacker = await Build.findById(attackerId);
    // always have "Bld" type to start with...
    let attackerUnitTargets = [];
    // work out what units types the defender has
    for (let group of Object.keys(attacker.units)){
        for (let units of Object.keys(attacker.units[group])){
            if (attacker.units[group][units].amount > 0){
                attacker.units[group][units].targets.forEach(type =>{
                    if (attackerUnitTargets.indexOf(type) === -1){
                        attackerUnitTargets.push(type);
                    }
                })
            }
        }
    }
    return attackerUnitTargets;
}

//needs to check buildings also
async function defenderUnitTargets(defenderId){
    const defender = await Enemy.findById(defenderId);
    let defenderUnitTargets = [];
    // work out what units types the defender attacks
    for (let group of Object.keys(defender.units)){
        for (let units of Object.keys(defender.units[group])){
            if (defender.units[group][units].minAmount > 0){
                defender.units[group][units].targets.forEach(type =>{
                    if (defenderUnitTargets.indexOf(type) === -1){
                        defenderUnitTargets.push(type);
                    }
                })
            }
        }
    }
    // works out what buildings the defender attacks
    for (let group of Object.keys(defender.buildings)){
        if (defender.buildings[group].minAmount > 0){
            defender.buildings[group].targets.forEach(type =>{
                if (defenderUnitTargets.indexOf(type) === -1){
                    defenderUnitTargets.push(type);
                }
            })
        }
    }
    //remove Bld target from defender as not needed.
    const index = defenderUnitTargets.indexOf("Bld");
    if (index > -1){
        defenderUnitTargets.splice(index, 1);
    }
    return defenderUnitTargets;
}


function between(apNeeded, ap){
    const result = {
        condition: "",
        info: ""
    }
    let plus20 = apNeeded*1.2
    let minus20 = apNeeded-(apNeeded*0.2);
    if (apNeeded > 0){
        if  (ap >= apNeeded && ap <= plus20){
            result.condition = "Close Victory";
            result.info = "You win but its within 20% of the defenders AP."
        } else if ( ap > plus20){
            result.condition = "Easy Victory";
            result.info = "You win by more then 20% of defenders AP."
        } else if (ap < apNeeded && ap >= minus20){
            result.condition = "Close Defeat";
            result.info = "You lose but its within 20% of the defenders AP."
        } else if ( ap < minus20){
            result.condition = "Heavy Defeat";
            result.info = "You lose by more then 20% of the defenders AP."
        }
    } else {
        result.condition = "No Enemy Stats!"
        result.info = "Please add enemy setup on the enemy setup page"
    }

    return result;
}

// work out attackers active AP.
async function attackerAP (user, defender){
    const attacker = await Build.findById(user);
    const defenderSetup = await Enemy.findById(defender);
    const defenderUnits = await defenderUnitTypes(defender);
	const attackerUnits = await attackerUnitTypes(user);
	const attackerTargets = await attackerUnitTargets(user);
	const defenderTargets = await defenderUnitTargets(defender);
    // console.log(defenderSetup);
    // console.log(defenderUnits);
    // console.log(attackerUnits);
    // console.log(attackerTargets);
    // console.log(defenderTargets);

    let activeAP = 0;
    let usedUnits = [];
    
    defenderUnits.forEach(type => {
        if (attackerTargets.includes(type)){
            for (let group of Object.keys(attacker.units)){
                for (let units of Object.keys(attacker.units[group])){
                    if(attacker.units[group][units].targets.includes(type)){
                        if (attacker.units[group][units].amount > 0 && !usedUnits.some(e => e === attacker.units[group][units].name)){
                            usedUnits.push(attacker.units[group][units].name)
                            // console.log(attacker.units[group][units].amount * attacker.units[group][units].attack)
                            activeAP += attacker.units[group][units].amount * attacker.units[group][units].attack;
                        }
                    }
                }
            }
        }
    })
    // console.log(activeAP)
    let likleyAmount = 0;
    let activeDP = 0;
    let usedDefUnits =[];

    // works out activeDP from units
    attackerUnits.forEach(type => {
        if (defenderTargets.includes(type) && !defenderTargets.includes("Bld")){
            for (let group of Object.keys(defenderSetup.units)){
                for (let units of Object.keys(defenderSetup.units[group])){
                    if(defenderSetup.units[group][units].targets.includes(type)){
                        if (defenderSetup.units[group][units].minAmount > 0 && !usedDefUnits.some(e => e === defenderSetup.units[group][units].name)){
                            usedDefUnits.push(defenderSetup.units[group][units].name);
                            likleyAmount = defenderSetup.units[group][units].minAmount*1.17;
                            activeDP += likleyAmount * defenderSetup.units[group][units].attack;
                        }
                    }
                }
            }
        }
    })

    // works out activeDP from buildings
    attackerUnits.forEach(type => {
        if (defenderTargets.includes(type) && !defenderTargets.includes("Bld")){
            for (let group of Object.keys(defenderSetup.buildings)){
                if (defenderSetup.buildings[group].targets.includes(type)){
                    if (defenderSetup.buildings[group].minAmount > 0 &&  !usedDefUnits.some(e => e === defenderSetup.buildings[group].name)){
                        likleyAmount = defenderSetup.buildings[group].minAmount*1.17;
                        activeDP += likleyAmount * defenderSetup.buildings[group].attack;
                    }
                }
            }
        }
    })

    let apNeeded = Math.ceil(activeDP*1.1);

    // console.log(usedDefUnits)
    // console.log(activeAP);
    // console.log(activeDP)
    // console.log(apNeeded);

    //work out function to check who wins
    return between(apNeeded, activeAP);
}


module.exports = {
    defenderUnitTypes,
    attackerUnitTypes,
    defenderUnitTargets,
    attackerUnitTargets,
    attackerAP
    
}