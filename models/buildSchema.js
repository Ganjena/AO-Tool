const mongoose = require(`mongoose`);

const buildSchema = new mongoose.Schema({
	land: Number,
	units: {
		seaUnits: {
			submarine: {
                name: {
                    type: String,
                    default: `Submarine`
                },
                price: {
                    type: Number,
                    default: 22000
                },
                amount: {
                    type: Number,
                    default: 0
                },
                attack:{
                    type: Number,
                    default: 115
                },
                defense: {
                    type: Number,
                    default: 70
                },
                targets:{
                    type: Array,
                    default: [`Sea`]
                },
                nwAdded:{
                    type: Number,
                    default: 11
                }
            },
			cruiser: {
                name: {
                    type: String,
                    default: `Cruiser`
                },
                price: {
                    type: Number,
                    default: 1415
                },
                amount: {
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
                },
                nwAdded:{
                    type: Number,
                    default: 11
                }
            },
			seaScorpion: {
                name: {
                    type: String,
                    default: `Sea Scorpion`
                },
                price: {
                    type: Number,
                    default: 875
                },
                amount: {
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
                },
                nwAdded:{
                    type: Number,
                    default: 11
                }
            },
			destroyer: {
                name: {
                    type: String,
                    default: `Destroyer`
                },
                price: {
                    type: Number,
                    default: 1365
                },
                amount: {
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
                },
                nwAdded:{
                    type: Number,
                    default: 11
                }
            },
			corvette: {
                name: {
                    type: String,
                    default: `Corvette`
                },
                price: {
                    type: Number,
                    default: 1090
                },
                amount: {
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
                },
                nwAdded:{
                    type: Number,
                    default: 11
                }
            },
			battleship: {
                name: {
                    type: String,
                    default: `Battleship`
                },
                price: {
                    type: Number,
                    default: 2350
                },
                amount: {
                    type: Number,
                    default: 0
                },
                attack:{
                    type: Number,
                    default: 155
                },
                defense: {
                    type: Number,
                    default: 145
                },
                targets:{
                    type: Array,
                    default: [`Bld`]
                },
                nwAdded:{
                    type: Number,
                    default: 11
                }
            },
			stealthBoat: {
                name: {
                    type: String,
                    default: `Stealth Boat`
                },
                price: {
                    type: Number,
                    default: 1315
                },
                amount: {
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
                },
                nwAdded:{
                    type: Number,
                    default: 11
                }
            },
			ussZumwalt: {
                name: {
                    type: String,
                    default: `USS Zumwalt`
                },
                price: {
                    type: Number,
                    default: 1450
                },
                amount: {
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
                },
                nwAdded:{
                    type: Number,
                    default: 11
                }
            },
			aircraftCarrier: {
                name: {
                    type: String,
                    default: `Aircraft Carrier`
                },
                price: {
                    type: Number,
                    default: 2125
                },
                amount: {
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
                },
                nwAdded:{
                    type: Number,
                    default: 11
                }
            },
		},
		airUnits: {
			spyPlane: {
                name: {
                    type: String,
                    default: `SR-71 Spyplane`
                },
                price: {
                    type: Number,
                    default: 15000
                },
                amount: {
                    type: Number,
                    default: 0
                },
                attack:{
                    type: Number,
                    default: 0
                },
                defense: {
                    type: Number,
                    default: 200
                },
                targets:{
                    type: Array,
                    default: [`N/A`]
                },
                nwAdded:{
                    type: Number,
                    default: 6
                }
            },
			blackEagle: {
                name: {
                    type: String,
                    default: `Black Eagle`
                },
                price: {
                    type: Number,
                    default: 730
                },
                amount: {
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
                },
                nwAdded:{
                    type: Number,
                    default: 11
                }
            },
			mig: {
                name: {
                    type: String,
                    default: `MiG`
                },
                price: {
                    type: Number,
                    default: 795
                },
                amount: {
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
                },
                nwAdded:{
                    type: Number,
                    default: 11
                }
            },
			harrier: {
                name: {
                    type: String,
                    default: `Harrier`
                },
                price: {
                    type: Number,
                    default: 690
                },
                amount: {
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
                },
                nwAdded:{
                    type: Number,
                    default: 11
                }
            },
			hind: {
                name: {
                    type: String,
                    default: `Hind`
                },
                price: {
                    type: Number,
                    default: 840
                },
                amount: {
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
                },
                nwAdded:{
                    type: Number,
                    default: 11
                }
            },
			siegeChopper: {
                name: {
                    type: String,
                    default: `Siege Chopper`
                },
                price: {
                    type: Number,
                    default: 840
                },
                amount: {
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
                },
                nwAdded:{
                    type: Number,
                    default: 11
                }
            },
			b52Bomber: {
                name: {
                    type: String,
                    default: `B52 Stratofortress`
                },
                price: {
                    type: Number,
                    default: 1800
                },
                amount: {
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
                },
                nwAdded:{
                    type: Number,
                    default: 11
                }
            },
			f22Raptor: {
                name: {
                    type: String,
                    default: `F22 Raptor`
                },
                price: {
                    type: Number,
                    default: 750
                },
                amount: {
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
                },
                nwAdded:{
                    type: Number,
                    default: 11
                }
            },
			f18Hornet: {
                name: {
                    type: String,
                    default: `F18 Hornet`
                },
                price: {
                    type: Number,
                    default: 860
                },
                amount: {
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
                },
                nwAdded:{
                    type: Number,
                    default: 11
                }
            },
		},

		vehUnits: {
			tigerTank: {
                name: {
                    type: String,
                    default: `Tiger Tank`
                },
                price: {
                    type: Number,
                    default: 835
                },
                amount: {
                    type: Number,
                    default: 0
                },
                attack:{
                    type: Number,
                    default: 65
                },
                defense: {
                    type: Number,
                    default: 54
                },
                targets:{
                    type: Array,
                    default: [`Inf`, `Bld`]
                },
                nwAdded:{
                    type: Number,
                    default: 11
                }
            },
			mirageTank: {
                name: {
                    type: String,
                    default: `Mirage Tank`
                },
                price: {
                    type: Number,
                    default: 635
                },
                amount: {
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
                },
                nwAdded:{
                    type: Number,
                    default: 11
                }
            },
			teslaTank: {
                name: {
                    type: String,
                    default: `Tesla Tank`
                },
                price: {
                    type: Number,
                    default: 515
                },
                amount: {
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
                },
                nwAdded:{
                    type: Number,
                    default: 11
                }
            },
			ifv: {
                name: {
                    type: String,
                    default: `I.F.V`
                },
                price: {
                    type: Number,
                    default: 630
                },
                amount: {
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
                },
                nwAdded:{
                    type: Number,
                    default: 11
                }
            },
			samTank: {
                name: {
                    type: String,
                    default: `SAM Tank`
                },
                price: {
                    type: Number,
                    default: 715
                },
                amount: {
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
                },
                nwAdded:{
                    type: Number,
                    default: 11
                }
            },
			paladin: {
                name: {
                    type: String,
                    default: `Paladin`
                },
                price: {
                    type: Number,
                    default: 1550
                },
                amount: {
                    type: Number,
                    default: 0
                },
                attack:{
                    type: Number,
                    default: 115
                },
                defense: {
                    type: Number,
                    default: 85
                },
                targets:{
                    type: Array,
                    default: [`Bld`]
                },
                nwAdded:{
                    type: Number,
                    default: 11
                }
            },
			blackPanther: {
                name: {
                    type: String,
                    default: `K2 Black Panther`
                },
                price: {
                    type: Number,
                    default: 590
                },
                amount: {
                    type: Number,
                    default: 0
                },
                attack:{
                    type: Number,
                    default: 44
                },
                defense: {
                    type: Number,
                    default: 36
                },
                targets:{
                    type: Array,
                    default: [`Veh`, `Inf`]
                },
                nwAdded:{
                    type: Number,
                    default: 11
                }
            },
			m1Tank: {
                name: {
                    type: String,
                    default: `M1 Abram Tank`
                },
                price: {
                    type: Number,
                    default: 645
                },
                amount: {
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
                },
                nwAdded:{
                    type: Number,
                    default: 11
                }
            },
		},
		infUnits: {
			thief: {
                name: {
                    type: String,
                    default: `Thief`
                },
                price: {
                    type: Number,
                    default: 5000
                },
                amount: {
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
                nwAdded:{
                    type: Number,
                    default: 6
                }
            },
			saboteur: {
                name: {
                    type: String,
                    default: `Saboteur`
                },
                price: {
                    type: Number,
                    default: 6000
                },
                amount: {
                    type: Number,
                    default: 0
                },
                attack:{
                    type: Number,
                    default: 0
                },
                defense: {
                    type: Number,
                    default: 75
                },
                targets:{
                    type: Array,
                    default: [`N/A`]
                },
                nwAdded:{
                    type: Number,
                    default: 6
                }
            },
			sniper: {
                name: {
                    type: String,
                    default: `Sniper`
                },
                price: {
                    type: Number,
                    default: 5000
                },
                amount: {
                    type: Number,
                    default: 0
                },
                attack:{
                    type: Number,
                    default: 140
                },
                defense: {
                    type: Number,
                    default: 150
                },
                targets:{
                    type: Array,
                    default: [`N/A`]
                },
                nwAdded:{
                    type: Number,
                    default: 6
                }
            },
			spy: {
                name: {
                    type: String,
                    default: `Spy`
                },
                price: {
                    type: Number,
                    default: 4000
                },
                amount: {
                    type: Number,
                    default: 0
                },
                attack:{
                    type: Number,
                    default: 0
                },
                defense: {
                    type: Number,
                    default: 250
                },
                targets:{
                    type: Array,
                    default: [`N/A`]
                },
                nwAdded:{
                    type: Number,
                    default: 6
                }
            },
			conscript: {
                name: {
                    type: String,
                    default: `Conscript`
                },
                price: {
                    type: Number,
                    default: 470
                },
                amount: {
                    type: Number,
                    default: 0
                },
                attack:{
                    type: Number,
                    default: 35
                },
                defense: {
                    type: Number,
                    default: 19
                },
                targets:{
                    type: Array,
                    default: [`Veh`]
                },
                nwAdded:{
                    type: Number,
                    default: 11
                }
            },
			rifleInfantry: {
                name: {
                    type: String,
                    default: `Rifle Infantry`
                },
                price: {
                    type: Number,
                    default: 810
                },
                amount: {
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
                },
                nwAdded:{
                    type: Number,
                    default: 11
                }
            },
			teslaTrooper: {
                name: {
                    type: String,
                    default: `Tesla Trooper`
                },
                price: {
                    type: Number,
                    default: 435
                },
                amount: {
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
                    default: [`Sea`, `Bld`]
                },
                nwAdded:{
                    type: Number,
                    default: 11
                }   
            },
			rocketeer: {
                name: {
                    type: String,
                    default: `Rocketeer`
                },
                price: {
                    type: Number,
                    default: 550
                },
                amount: {
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
                },
                nwAdded:{
                    type: Number,
                    default: 11
                }
            },
			gi: {
                name: {
                    type: String,
                    default: `G.I`
                },
                price: {
                    type: Number,
                    default: 880
                },
                amount: {
                    type: Number,
                    default: 0
                },
                attack:{
                    type: Number,
                    default: 70
                },
                defense: {
                    type: Number,
                    default: 35
                },
                targets:{
                    type: Array,
                    default: [`Bld`]
                },
                nwAdded:{
                    type: Number,
                    default: 11
                }
            },
			guardianGi: {
                name: {
                    type: String,
                    default: `Guardian G.I`
                },
                price: {
                    type: Number,
                    default: 615
                },
                amount: {
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
                },
                nwAdded:{
                    type: Number,
                    default: 11
                }
            },
			machineGunners: {
                name: {
                    type: String,
                    default: `Machine Gunners`
                },
                price: {
                    type: Number,
                    default: 325
                },
                amount: {
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
                },
                nwAdded:{
                    type: Number,
                    default: 11
                }
            },
			cyborgCommando: {
                name: {
                    type: String,
                    default: `Cyborg Commando`
                },
                price: {
                    type: Number,
                    default: 440
                },
                amount: {
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
                },
                nwAdded:{
                    type: Number,
                    default: 11
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
            price: {
                type: Number,
                default: 22000
            },
            amount: {
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
            nwAdded:{
                type: Number,
                default: 6
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
            price: {
                type: Number,
                default: 2200
            },
            amount: {
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
            nwAdded:{
                type: Number,
                default: 6
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
            price: {
                type: Number,
                default: 1100
            },
            amount: {
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
            nwAdded:{
                type: Number,
                default: 6
            },
            power:{
                type: Number,
                default: 700
            }
        },
        airfield: {
            name: {
                type: String,
                default: `Airfields`
            },
            price: {
                type: Number,
                default: 1000
            },
            amount: {
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
            nwAdded:{
                type: Number,
                default: 6
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
            price: {
                type: Number,
                default: 1200
            },
            amount: {
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
            nwAdded:{
                type: Number,
                default: 6
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
            price: {
                type: Number,
                default: 700
            },
            amount: {
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
            nwAdded:{
                type: Number,
                default: 6
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
            price: {
                type: Number,
                default: 600
            },
            amount: {
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
            nwAdded:{
                type: Number,
                default: 6
            },
            power:{
                type: Number,
                default: 4500
            }
        },
        advancedPowerplant: {
            name: {
                type: String,
                default: `Advanced Powerplant`
            },
            price: {
                type: Number,
                default: 1300
            },
            amount: {
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
            nwAdded:{
                type: Number,
                default: 6
            },
            power:{
                type: Number,
                default: 22500
            }
        },
        torpedoLauncher: {
            name: {
                type: String,
                default: `Torpedo Launcher`
            },
            price: {
                type: Number,
                default: 1580
            },
            amount: {
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
            nwAdded:{
                type: Number,
                default: 9
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
            price: {
                type: Number,
                default: 1495
            },
            amount: {
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
            nwAdded:{
                type: Number,
                default: 9
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
            price: {
                type: Number,
                default: 1500
            },
            amount: {
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
            nwAdded:{
                type: Number,
                default: 9
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
            price: {
                type: Number,
                default: 1465
            },
            amount: {
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
            nwAdded:{
                type: Number,
                default: 9
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
            price: {
                type: Number,
                default: 5000
            },
            amount: {
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
            nwAdded:{
                type: Number,
                default: 14
            },
            power:{
                type: Number,
                default: 2400
            }
        },
	},
	missiles: {
        nuclearMissile: {
            name: {
                type: String,
                default: `Nuclear Missile`
            },
            price: {
                type: Number,
                default: 125000
            },
            amount: {
                type: Number,
                default: 0
            },
            attack:{
                type: Number,
                default: 25000
            },
            targets:{
                type: Array,
                default: [`Sea`, `Air`, `Veh`, `Inf`, `Bld`]
            },
            nwAdded:{
                type: Number,
                default: 10
            }
        },
        chemicalMissile: {
            name: {
                type: String,
                default: `Chemical Missile`
            },
            price: {
                type: Number,
                default: 62500
            },
            amount: {
                type: Number,
                default: 0
            },
            attack:{
                type: Number,
                default: 15000
            },
            targets:{
                type: Array,
                default: [`Sea`, `Air`, `Veh`]
            },
            nwAdded:{
                type: Number,
                default: 10
            }
        },
        biochemicalMissile: {
            name: {
                type: String,
                default: `Biochemical Missile`
            },
            price: {
                type: Number,
                default: 43750
            },
            amount: {
                type: Number,
                default: 0
            },
            attack:{
                type: Number,
                default: 6000
            },
            targets:{
                type: Array,
                default: [`Inf`]
            },
            nwAdded:{
                type: Number,
                default: 10
            }
        },
        moab: {
            name: {
                type: String,
                default: `MOAB`
            },
            price: {
                type: Number,
                default: 57000
            },
            amount: {
                type: Number,
                default: 0
            },
            attack:{
                type: Number,
                default: 7200
            },
            targets:{
                type: Array,
                default: [`Bld`]
            },
            nwAdded:{
                type: Number,
                default: 10
            }
        },
        empMissile: {
            name: {
                type: String,
                default: `EMP Missile`
            },
            price: {
                type: Number,
                default: 65000
            },
            amount: {
                type: Number,
                default: 0
            },
            attack:{
                type: Number,
                default: 0
            },
            targets:{
                type: Array,
                default: [`N/A`]
            },
            nwAdded:{
                type: Number,
                default: 10
            }
        },
	},
	satellite: {
        laserbeamSat: {
            name: {
                type: String,
                default: `Laser Beam Satellite`
            },
            price: {
                type: Number,
                default: 1000000
            },
            amount: {
                type: Number,
                default: 0
            },
            effect:{
                type: String,
                default: `Fire an orbital laser cannon every 5 hours.`
            },
            nwAdded:{
                type: Number,
                default: 5
            }
        },
        stealthSat: {
            name: {
                type: String,
                default: `Stealth Satellite`
            },
            price: {
                type: Number,
                default: 600000
            },
            amount: {
                type: Number,
                default: 0
            },
            effect:{
                type: String,
                default: `Hides your base from enemy spies, thieves, saboteurs, snipers, laser beam satellites and EMP satellites for 4 hours.`
            },
            nwAdded:{
                type: Number,
                default: 4
            }
        },
        amsSat: {
            name: {
                type: String,
                default: `Anti-Missile Satellite`
            },
            price: {
                type: Number,
                default: 500000
            },
            amount: {
                type: Number,
                default: 0
            },
            effect:{
                type: String,
                default: `An anti-missile satellite grants 100% protection against missiles.`
            },
            nwAdded:{
                type: Number,
                default: 4
            }
        },
        empSat: {
            name: {
                type: String,
                default: `EMP Satellite`
            },
            price: {
                type: Number,
                default: 500000
            },
            amount: {
                type: Number,
                default: 0
            },
            effect:{
                type: String,
                default: `Disables 20% of the target power production.`
            },
            nwAdded:{
                type: Number,
                default: 4
            }
        }
	},
	research: {
        moneyProduction: {
            name: {
                type: String,
                default: "Money Production"
            },
            level: {
                type: Number,
                default: 0
            },
            effect: {
                type: Array,
                default: [
                    `Level 1 (8 hours): Income increased to $25,000 per hour`,
                    `Level 2 (8 hours): Income increased to $35,000 per hour`,
                    `Income is $35,000 per hour.`
                ]
            },
            hours: {
                type: Number,
                default: 8
            },
            nwAdded:{
                type: Number,
                default: 1500
            }
        },
        engineeringEff: {
            name: {
                type: String,
                default: "Engineering Effectiveness"
            },
            level: {
                type: Number,
                default: 0
            },
            effect: {
                type: Array,
                default: [
                    `Level 1 (5 hours): 10 buildings built per turn.`,
                    `Level 2 (5 hours): 15 buildings built per turn.`,
                    `15 Buildings per turn.`
                ]
            },
            hours: {
                type: Number,
                default: 5
            },
            nwAdded:{
                type: Number,
                default: 1500
            }
        },
        bankManagment: {
            name: {
                type: String,
                default: "Bank Managment"
            },
            level: {
                type: Number,
                default: 0
            },
            effect: {
                type: Array,
                default: [
                    `Level 1 (5 hours): Bank stores up to $ 3,500,000 and the default bank interest increases by 0,5%`,
                    `Level 2 (5 hours): Bank stores up to $ 4,500,000 and the default bank interest increases by 1% + option to withdraw money after 24 hours with no interest and with a 50% fee`,
                    `Level 3 (5 hours): Bank stores up to $ 5,000,000 and the default bank interest increases by 1,75% + option to withdraw money after 24 hours with no interest and with a 25% fee`,
                    `Full bank capacity`
                ]
            },
            hours: {
                type: Number,
                default: 5
            },
            nwAdded:{
                type: Number,
                default: 1500
            }
        },
        powerplantEff: {
            name: {
                type: String,
                default: "Powerplant Efficiency"
            },
            level: {
                type: Number,
                default: 0
            },
            effect: {
                type: Array,
                default: [
                    `Level 1 (3 hours): Power Plants and Advanced Power Plants life and power produced increased by 50%`,
                    `Powerplants are strong and produce more power`
                ]
            },
            hours: {
                type: Number,
                default: 3
            },
            nwAdded:{
                type: Number,
                default: 1500
            }
        },
        missileAccuracy : {
            name: {
                type: String,
                default: "Missile Accuracy"
            },
            level: {
                type: Number,
                default: 0
            },
            effect: {
                type: Array,
                default: [
                    `Level 1 (5 hours): 45% chance to hit the target`,
                    `Level 2 (5 hours): 90% chance to hit the target`,
                    `Level 3 (5 hours): The number of possible sabotaged Missile Silos goes down from 2 to 1 and decreases the chance of sabotaging your Missile Silo by 10%.`,
                    `90% missile chance annd get sabotaged less`
                ]
            },
            hours: {
                type: Number,
                default: 5
            },
            nwAdded:{
                type: Number,
                default: 1500
            }
        },
        satTech: {
            name: {
                type: String,
                default: "Satellite Technology"
            },
            level: {
                type: Number,
                default: 0
            },
            effect: {
                type: Array,
                default: [
                    `Level 1 (5 hours): Allows you to build satellites`,
                    `Level 2 (5 hours): Extends the maximum orbit time of satellites by 5 days`,
                    `Level 3 (5 hours): Construction cost of satellites reduced by 20%`,
                    `Sats stay up for 15 days and cost 20% less`
                ]
            },
            hours: {
                type: Number,
                default: 5
            },
            nwAdded:{
                type: Number,
                default: 1500
            }
        },
        thiefEducation: {
            name: {
                type: String,
                default: "Thief Education"
            },
            level: {
                type: Number,
                default: 0
            },
            effect: {
                type: Array,
                default: [
                    `Level 1 (3hours): Thieves steal two times the amount of money and the risk of getting caught is lower`,
                    `Level 2 (3 hours): Thieves steal three times the amount of money and the risk of getting caught is lower`,
                    `Level 3 (3 hours): Thieves steal four times the amount of money and the risk of getting caught is lower`,
                    `Thieves steal four times more money and get caught less`
                ]
            },
            hours: {
                type: Number,
                default: 3
            },
            nwAdded:{
                type: Number,
                default: 1500
            }
        },
        mst: {
            name: {
                type: String,
                default: "Market Shipping Time"
            },
            level: {
                type: Number,
                default: 0
            },
            effect: {
                type: Array,
                default: [
                    `Level 1 (3 hours): Shipping time reduced to 9 hours`,
                    `Level 2 (3 hours): Shipping time reduced to 6 hours`,
                    `Shipping time reduced to 6 hours`
                ]
            },
            hours: {
                type: Number,
                default: 3
            },
            nwAdded:{
                type: Number,
                default: 1500
            }
        },
        marketDiscount: {
            name: {
                type: String,
                default: "Market Discount"
            },
            level: {
                type: Number,
                default: 0
            },
            effect: {
                type: Array,
                default: [
                    `Level 1 (3 hours): 15% discount on all units purchased from the market`,
                    `Level 2 (3 hours): 30% discount on all units purchased from the market`,
                    `30% market discount`
                ]
            },
            hours: {
                type: Number,
                default: 3
            },
            nwAdded:{
                type: Number,
                default: 1500
            }
        }
	},
	miscStat: {
		totalNW: {
            type: Number,
            default: 0
        },
        land: {
            type: Number,
            default: 0
        },
        turns: {
            type: Number,
            default: 0
        },
        power: {
            type: Number,
            default: 0
        }
	},
    attackStats: {
        againstSea: {
            type: Number,
            default: 0
        },
        againstAir: {
            type: Number,
            default: 0
        },
        againstVeh: {
            type: Number,
            default: 0
        },
        againstInf: {
            type: Number,
            default: 0
        }
    },
    winLoss: {
        againstSea: {
            type: String,
            default: `-`
        },
        againstAir: {
            type: String,
            default: `-`
        },
        againstVeh: {
            type: String,
            default: `-`
        },
        againstInf: {
            type: String,
            default: `-`
        }
    }
});

const Build = mongoose.model(`Build`, buildSchema);
module.exports = Build;