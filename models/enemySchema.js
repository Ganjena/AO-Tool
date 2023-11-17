const mongoose = require(`mongoose`);

const enemySchema = new mongoose.Schema({
    units: {
		seaUnits: {
			submarine: {
                name: {
                    type: String,
                    default: `Submarine`
                },
                minAmount: {
                    type: Number,
                    default: 0
                },
                maxAmount:{
                    type: Number,
                    default: 0
                },
                attack:{
                    type: Number,
                    default: 138
                },
                defense: {
                    type: Number,
                    default: 82
                },
                targets:{
                    type: Array,
                    default: [`Sea`]
                }
            },
			cruiser: {
                name: {
                    type: String,
                    default: `Cruiser`
                },
                minAmount: {
                    type: Number,
                    default: 0
                },
                maxAmount: {
                    type: Number,
                    default: 0
                },
                attack:{
                    type: Number,
                    default: 105
                },
                defense: {
                    type: Number,
                    default: 89
                },
                targets:{
                    type: Array,
                    default: [`Air`, `Bld`]
                }
            },
			seaScorpion: {
                name: {
                    type: String,
                    default: `Sea Scorpion`
                },
                minAmount: {
                    type: Number,
                    default: 0
                },
                maxAmount: {
                    type: Number,
                    default: 0
                },
                attack:{
                    type: Number,
                    default: 80
                },
                defense: {
                    type: Number,
                    default: 49
                },
                targets:{
                    type: Array,
                    default: [`Inf`]
                }
            },
			destroyer: {
                name: {
                    type: String,
                    default: `Destroyer`
                },
                minAmount: {
                    type: Number,
                    default: 0
                },
                maxAmount: {
                    type: Number,
                    default: 0
                },
                attack:{
                    type: Number,
                    default: 95
                },
                defense: {
                    type: Number,
                    default: 80
                },
                targets:{
                    type: Array,
                    default: [`Veh`, `Inf`, `Bld`]
                }
            },
			corvette: {
                name: {
                    type: String,
                    default: `Corvette`
                },
                minAmount: {
                    type: Number,
                    default: 0
                },
                maxAmount: {
                    type: Number,
                    default: 0
                },
                attack:{
                    type: Number,
                    default: 90
                },
                defense: {
                    type: Number,
                    default: 75
                },
                targets:{
                    type: Array,
                    default: [`Veh`, `Bld`]
                }
            },
			battleship: {
                name: {
                    type: String,
                    default: `Battleship`
                },
                minAmount: {
                    type: Number,
                    default: 0
                },
                maxAmount: {
                    type: Number,
                    default: 0
                },
                attack:{
                    type: Number,
                    default: 195
                },
                defense: {
                    type: Number,
                    default: 145
                },
                targets:{
                    type: Array,
                    default: [`Bld`]
                }
            },
			stealthBoat: {
                name: {
                    type: String,
                    default: `Stealth Boat`
                },
                minAmount: {
                    type: Number,
                    default: 0
                },
                maxAmount: {
                    type: Number,
                    default: 0
                },
                attack:{
                    type: Number,
                    default: 95
                },
                defense: {
                    type: Number,
                    default: 75
                },
                targets:{
                    type: Array,
                    default: [`Sea`, `Veh`]
                }
            },
			ussZumwalt: {
                name: {
                    type: String,
                    default: `USS Zumwalt`
                },
                minAmount: {
                    type: Number,
                    default: 0
                },
                maxAmount: {
                    type: Number,
                    default: 0
                },
                attack:{
                    type: Number,
                    default: 110
                },
                defense: {
                    type: Number,
                    default: 90
                },
                targets:{
                    type: Array,
                    default: [`Sea`, `Bld`]
                }
            },
			aircraftCarrier: {
                name: {
                    type: String,
                    default: `Aircraft Carrier`
                },
                minAmount: {
                    type: Number,
                    default: 0
                },
                maxAmount: {
                    type: Number,
                    default: 0
                },
                attack:{
                    type: Number,
                    default: 120
                },
                defense: {
                    type: Number,
                    default: 80
                },
                targets:{
                    type: Array,
                    default: [`Sea`, `Air`, `Veh`]
                }
            },
		},
		airUnits: {
			blackEagle: {
                name: {
                    type: String,
                    default: `Black Eagle`
                },
                minAmount: {
                    type: Number,
                    default: 0
                },
                maxAmount: {
                    type: Number,
                    default: 0
                },
                attack:{
                    type: Number,
                    default: 55
                },
                defense: {
                    type: Number,
                    default: 53
                },
                targets:{
                    type: Array,
                    default: [`Veh`, `Bld`]
                }
            },
			mig: {
                name: {
                    type: String,
                    default: `MiG`
                },
                minAmount: {
                    type: Number,
                    default: 0
                },
                maxAmount: {
                    type: Number,
                    default: 0
                },
                attack:{
                    type: Number,
                    default: 60
                },
                defense: {
                    type: Number,
                    default: 42
                },
                targets:{
                    type: Array,
                    default: [`Inf`, `Bld`]
                }
            },
			harrier: {
                name: {
                    type: String,
                    default: `Harrier`
                },
                minAmount: {
                    type: Number,
                    default: 0
                },
                maxAmount: {
                    type: Number,
                    default: 0
                },
                attack:{
                    type: Number,
                    default: 55
                },
                defense: {
                    type: Number,
                    default: 47
                },
                targets:{
                    type: Array,
                    default: [`Air`]
                }
            },
			hind: {
                name: {
                    type: String,
                    default: `Hind`
                },
                minAmount: {
                    type: Number,
                    default: 0
                },
                maxAmount: {
                    type: Number,
                    default: 0
                },
                attack:{
                    type: Number,
                    default: 70
                },
                defense: {
                    type: Number,
                    default: 41
                },
                targets:{
                    type: Array,
                    default: [`Sea`]
                }
            },
			siegeChopper: {
                name: {
                    type: String,
                    default: `Siege Chopper`
                },
                minAmount: {
                    type: Number,
                    default: 0
                },
                maxAmount: {
                    type: Number,
                    default: 0
                },
                attack:{
                    type: Number,
                    default: 60
                },
                defense: {
                    type: Number,
                    default: 51
                },
                targets:{
                    type: Array,
                    default: [`Air`, `Veh`, `Bld`]
                }
            },
			b52Bomber: {
                name: {
                    type: String,
                    default: `B52 Stratofortress`
                },
                minAmount: {
                    type: Number,
                    default: 0
                },
                maxAmount: {
                    type: Number,
                    default: 0
                },
                attack:{
                    type: Number,
                    default: 155    
                },
                defense: {
                    type: Number,
                    default: 100
                },
                targets:{
                    type: Array,
                    default: [`Bld`]
                }
            },
			f22Raptor: {
                name: {
                    type: String,
                    default: `F22 Raptor`
                },
                minAmount: {
                    type: Number,
                    default: 0
                },
                maxAmount: {
                    type: Number,
                    default: 0
                },
                attack:{
                    type: Number,
                    default: 54
                },
                defense: {
                    type: Number,
                    default: 45
                },
                targets:{
                    type: Array,
                    default: [`Sea`,`Air`]
                }
            },
			f18Hornet: {
                name: {
                    type: String,
                    default: `F18 Hornet`
                },
                minAmount: {
                    type: Number,
                    default: 0
                },
                maxAmount: {
                    type: Number,
                    default: 0
                },
                attack:{
                    type: Number,
                    default: 60
                },
                defense: {
                    type: Number,
                    default: 45
                },
                targets:{
                    type: Array,
                    default: [`Air`, `Bld`]
                }
            },
		},
		vehUnits: {
			tigerTank: {
                name: {
                    type: String,
                    default: `Tiger Tank`
                },
                minAmount: {
                    type: Number,
                    default: 0
                },
                maxAmount: {
                    type: Number,
                    default: 0
                },
                attack:{
                    type: Number,
                    default: 65
                },
                defense: {
                    type: Number,
                    default: 42
                },
                targets:{
                    type: Array,
                    default: [`Inf`, `Bld`]
                }
            },
			mirageTank: {
                name: {
                    type: String,
                    default: `Mirage Tank`
                },
                minAmount: {
                    type: Number,
                    default: 0
                },
                maxAmount: {
                    type: Number,
                    default: 0
                },
                attack:{
                    type: Number,
                    default: 50
                },
                defense: {
                    type: Number,
                    default: 42
                },
                targets:{
                    type: Array,
                    default: [`Sea`, `Inf`, `Bld`]
                }
            },
			teslaTank: {
                name: {
                    type: String,
                    default: `Tesla Tank`
                },
                minAmount: {
                    type: Number,
                    default: 0
                },
                maxAmount: {
                    type: Number,
                    default: 0
                },
                attack:{
                    type: Number,
                    default: 45
                },
                defense: {
                    type: Number,
                    default: 38
                },
                targets:{
                    type: Array,
                    default: [`Sea`, `Bld`]
                }
            },
			ifv: {
                name: {
                    type: String,
                    default: `I.F.V`
                },
                minAmount: {
                    type: Number,
                    default: 0
                },
                maxAmount: {
                    type: Number,
                    default: 0
                },
                attack:{
                    type: Number,
                    default: 50
                },
                defense: {
                    type: Number,
                    default: 42
                },
                targets:{
                    type: Array,
                    default: [`Veh`]
                }
            },
			samTank: {
                name: {
                    type: String,
                    default: `SAM Tank`
                },
                minAmount: {
                    type: Number,
                    default: 0
                },
                maxAmount: {
                    type: Number,
                    default: 0
                },
                attack:{
                    type: Number,
                    default: 65
                },
                defense: {
                    type: Number,
                    default: 39
                },
                targets:{
                    type: Array,
                    default: [`Air`]
                }
            },
			paladin: {
                name: {
                    type: String,
                    default: `Paladin`
                },
                minAmount: {
                    type: Number,
                    default: 0
                },
                maxAmount: {
                    type: Number,
                    default: 0
                },
                attack:{
                    type: Number,
                    default: 135
                },
                defense: {
                    type: Number,
                    default: 90
                },
                targets:{
                    type: Array,
                    default: [`Bld`]
                }
            },
			blackPanther: {
                name: {
                    type: String,
                    default: `K2 Black Panther`
                },
                minAmount: {
                    type: Number,
                    default: 0
                },
                maxAmount: {
                    type: Number,
                    default: 0
                },
                attack:{
                    type: Number,
                    default: 43
                },
                defense: {
                    type: Number,
                    default: 35
                },
                targets:{
                    type: Array,
                    default: [`Veh`, `Inf`]
                }
            },
			m1Tank: {
                name: {
                    type: String,
                    default: `M1 Abram Tank`
                },
                minAmount: {
                    type: Number,
                    default: 0
                },
                maxAmount: {
                    type: Number,
                    default: 0
                },
                attack:{
                    type: Number,
                    default: 50
                },
                defense: {
                    type: Number,
                    default: 40
                },
                targets:{
                    type: Array,
                    default: [`Veh`, `Bld`]
                }
            },
		},
		infUnits: {
			conscript: {
                name: {
                    type: String,
                    default: `Conscript`
                },
                minAmount: {
                    type: Number,
                    default: 0
                },
                maxAmount: {
                    type: Number,
                    default: 0
                },
                attack:{
                    type: Number,
                    default: 38
                },
                defense: {
                    type: Number,
                    default: 25
                },
                targets:{
                    type: Array,
                    default: [`Veh`]
                }
            },
			rifleInfantry: {
                name: {
                    type: String,
                    default: `Rifle infantry`
                },
                minAmount: {
                    type: Number,
                    default: 0
                },
                maxAmount: {
                    type: Number,
                    default: 0
                },
                attack:{
                    type: Number,
                    default: 55
                },
                defense: {
                    type: Number,
                    default: 42
                },
                targets:{
                    type: Array,
                    default: [`Inf`]
                }
            },
			teslaTrooper: {
                name: {
                    type: String,
                    default: `Tesla Trooper`
                },
                minAmount: {
                    type: Number,
                    default: 0
                },
                maxAmount: {
                    type: Number,
                    default: 0
                },
                attack:{
                    type: Number,
                    default: 30
                },
                defense: {
                    type: Number,
                    default: 24
                },
                targets:{
                    type: Array,
                    default: [`Sea`,`Bld`]
                }
            },
			rocketeer: {
                name: {
                    type: String,
                    default: `Rocketeer`
                },
                minAmount: {
                    type: Number,
                    default: 0
                },
                maxAmount: {
                    type: Number,
                    default: 0
                },
                attack:{
                    type: Number,
                    default: 37
                },
                defense: {
                    type: Number,
                    default: 33
                },
                targets:{
                    type: Array,
                    default: [`Sea`, `Air`, `Bld`]
                }
            },
			gi: {
                name: {
                    type: String,
                    default: `G.I`
                },
                minAmount: {
                    type: Number,
                    default: 0
                },
                maxAmount: {
                    type: Number,
                    default: 0
                },
                attack:{
                    type: Number,
                    default: 76
                },
                defense: {
                    type: Number,
                    default: 50
                },
                targets:{
                    type: Array,
                    default: [`Bld`]
                }
            },
			guardianGi: {
                name: {
                    type: String,
                    default: `Guardian G.I`
                },
                minAmount: {
                    type: Number,
                    default: 0
                },
                maxAmount: {
                    type: Number,
                    default: 0
                },
                attack:{
                    type: Number,
                    default: 45
                },
                defense: {
                    type: Number,
                    default: 33
                },
                targets:{
                    type: Array,
                    default: [`Air`, `Bld`]
                }
            },
			machineGunners: {
                name: {
                    type: String,
                    default: `Machine Gunners`
                },
                minAmount: {
                    type: Number,
                    default: 0
                },
                maxAmount: {
                    type: Number,
                    default: 0
                },
                attack:{
                    type: Number,
                    default: 33
                },
                defense: {
                    type: Number,
                    default: 24
                },
                targets:{
                    type: Array,
                    default: [`Air`, `Inf`]
                }
            },
			cyborgCommando: {
                name: {
                    type: String,
                    default: `Cyborg Commando`
                },
                minAmount: {
                    type: Number,
                    default: 0
                },
                maxAmount: {
                    type: Number,
                    default: 0
                },
                attack:{
                    type: Number,
                    default: 30
                },
                defense: {
                    type: Number,
                    default: 25
                },
                targets:{
                    type: Array,
                    default: [`Inf`, `Bld`]
                }
            },
		},
	},
	buildings: {
        missileSilo: {
            name: {
                type: String,
                default: `Missile Silo`
            },
            minAmount: {
                type: Number,
                default: 0
            },
            maxAmount: {
                type: Number,
                default: 0
            },
            attack:{
                type: Number,
                default: 0
            },
            defense: {
                type: Number,
                default: 600
            },
            targets:{
                type: Array,
                default: [`N/A`]
            },
            power:{
                type: Number,
                default: 10000
            }
        },
        commandCenter: {
            name: {
                type: String,
                default: `Command Center`
            },
            minAmount: {
                type: Number,
                default: 0
            },
            maxAmount: {
                type: Number,
                default: 0
            },
            attack:{
                type: Number,
                default: 0
            },
            defense: {
                type: Number,
                default: 145
            },
            targets:{
                type: Array,
                default: [`N/A`]
            },
            power:{
                type: Number,
                default: 1800
            }
        },
        shipyard: {
            name: {
                type: String,
                default: `Shipyard`
            },
            minAmount: {
                type: Number,
                default: 0
            },
            maxAmount: {
                type: Number,
                default: 0
            },
            attack:{
                type: Number,
                default: 0
            },
            defense: {
                type: Number,
                default: 110
            },
            targets:{
                type: Array,
                default: [`N/A`]
            },
            power:{
                type: Number,
                default: 700
            }
        },
        airfield: {
            name: {
                type: String,
                default: `Airfield`
            },
            minAmount: {
                type: Number,
                default: 0
            },
            maxAmount: {
                type: Number,
                default: 0
            },
            attack:{
                type: Number,
                default: 0
            },
            defense: {
                type: Number,
                default: 110
            },
            targets:{
                type: Array,
                default: [`N/A`]
            },
            power:{
                type: Number,
                default: 600
            }
        },
        warfactory: {
            name: {
                type: String,
                default: `Warfactory`
            },
            minAmount: {
                type: Number,
                default: 0
            },
            maxAmount: {
                type: Number,
                default: 0
            },
            attack:{
                type: Number,
                default: 0
            },
            defense: {
                type: Number,
                default: 105
            },
            targets:{
                type: Array,
                default: [`N/A`]
            },
            power:{
                type: Number,
                default: 550
            }
        },
        barracks: {
            name: {
                type: String,
                default: `Barracks`
            },
            minAmount: {
                type: Number,
                default: 0
            },
            maxAmount: {
                type: Number,
                default: 0
            },
            attack:{
                type: Number,
                default: 0
            },
            defense: {
                type: Number,
                default: 85
            },
            targets:{
                type: Array,
                default: [`N/A`]
            },
            power:{
                type: Number,
                default: 500
            }
        },
        powerplant: {
            name: {
                type: String,
                default: `Powerplant`
            },
            minAmount: {
                type: Number,
                default: 0
            },
            maxAmount: {
                type: Number,
                default: 0
            },
            attack:{
                type: Number,
                default: 0
            },
            defense: {
                type: Number,
                default: 130
            },
            targets:{
                type: Array,
                default: [`N/A`]
            },
            power:{
                type: Number,
                default: 3000
            }
        },
        advancedPowerplant: {
            name: {
                type: String,
                default: `Advanced Powerplant`
            },
            minAmount: {
                type: Number,
                default: 0
            },
            maxAmount: {
                type: Number,
                default: 0
            },
            attack:{
                type: Number,
                default: 0
            },
            defense: {
                type: Number,
                default: 60
            },
            targets:{
                type: Array,
                default: [`N/A`]
            },
            power:{
                type: Number,
                default: 15000
            }
        },
        torpedoLauncher: {
            name: {
                type: String,
                default: `Torpedo Launcher`
            },
            minAmount: {
                type: Number,
                default: 0
            },
            maxAmount: {
                type: Number,
                default: 0
            },
            attack:{
                type: Number,
                default: 250
            },
            defense: {
                type: Number,
                default: 360
            },
            targets:{
                type: Array,
                default: [`Sea`]
            },
            power:{
                type: Number,
                default: 750
            }
        },
        samSite: {
            name: {
                type: String,
                default: `SAM Site`
            },
            minAmount: {
                type: Number,
                default: 0
            },
            maxAmount: {
                type: Number,
                default: 0
            },
            attack:{
                type: Number,
                default: 225
            },
            defense: {
                type: Number,
                default: 330
            },
            targets:{
                type: Array,
                default: [`Air`]
            },
            power:{
                type: Number,
                default: 600
            }
        },
        missileTurret: {
            name: {
                type: String,
                default: `Missile Turret`
            },
            minAmount: {
                type: Number,
                default: 0
            },
            maxAmount: {
                type: Number,
                default: 0
            },
            attack:{
                type: Number,
                default: 220
            },
            defense: {
                type: Number,
                default: 340
            },
            targets:{
                type: Array,
                default: [`Veh`]
            },
            power:{
                type: Number,
                default: 550
            }
        },
        machinegunTurret: {
            name: {
                type: String,
                default: `Machinegun Turret`
            },
            minAmount: {
                type: Number,
                default: 0
            },
            maxAmount: {
                type: Number,
                default: 0
            },
            attack:{
                type: Number,
                default: 230
            },
            defense: {
                type: Number,
                default: 300
            },
            targets:{
                type: Array,
                default: [`Inf`]
            },
            power:{
                type: Number,
                default: 700
            }
        },
        ams: {
            name: {
                type: String,
                default: `Anti-Missile System`
            },
            minAmount: {
                type: Number,
                default: 0
            },
            maxAmount: {
                type: Number,
                default: 0
            },
            attack:{
                type: Number,
                default: 0
            },
            defense: {
                type: Number,
                default: 390
            },
            targets:{
                type: Array,
                default: [`Mis`]
            },
            power:{
                type: Number,
                default: 2400
            }
        },
	},
    land: {
        type: Number,
        default: 0
    },
    ppeActive: {
        type: Number,
        default: 0
    },
    name: {
        type: String,
        default: "N/A"
    },
    networth: {
        type: Number,
        default: 0
    },
    stats: {
        maxBuildings: {
            type: Number,
            default: 0
        },
        minBuildings: {
            type: Number,
            default: 0
        },
        likleyBuildings: {
            type: Number,
            default: 0
        },
        maxPower: {
            type: Number,
            default: 0
        },
        minPower: {
            type: Number,
            default: 0
        },
        likleyPower: {
            type: Number,
            default: 0
        },
        maxFreeLand: {
            type: Number,
            default: 0
        },
        minFreeLand: {
            type: Number,
            default: 0
        },
        likleyFreeLand: {
            type: Number,
            default: 0
        }
    },
    attackStats: {
        againstSea:{
            minAmount: {
                type: Number,
                default: 0
            },
            maxAmount: {
                type: Number,
                default: 0
            },
            likleyAmount: {
                type: Number,
                default: 0
            }
        },
        againstAir:{
            minAmount: {
                type: Number,
                default: 0
            },
            maxAmount: {
                type: Number,
                default: 0
            },
            likleyAmount: {
                type: Number,
                default: 0
            }
        },
        againstVeh:{
            minAmount: {
                type: Number,
                default: 0
            },
            maxAmount: {
                type: Number,
                default: 0
            },
            likleyAmount: {
                type: Number,
                default: 0
            }
        },
        againstInf:{
            minAmount: {
                type: Number,
                default: 0
            },
            maxAmount: {
                type: Number,
                default: 0
            },
            likleyAmount: {
                type: Number,
                default: 0
            }
        },
    }
});

const Enemy = mongoose.model(`Enemy`, enemySchema);
module.exports = Enemy;