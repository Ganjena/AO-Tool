const BaseJoi = require("joi");
const sanitizeHtml = require(`sanitize-html`);

//Joi extension to santize html and scripts from all inputs
const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension);

const enemySchema = Joi.object({
    seaUnits: Joi.object({
        submarine: Joi.object({
            minAmount: Joi.number().allow(null, ``).min(0),
            maxAmount: Joi.number().allow(null, ``).min(0)
        }),
        cruiser: Joi.object({
            minAmount: Joi.number().allow(null, ``).min(0),
            maxAmount: Joi.number().allow(null, ``).min(0)
        }),
        seaScorpion: Joi.object({
            minAmount: Joi.number().allow(null, ``).min(0),
            maxAmount: Joi.number().allow(null, ``).min(0)
        }),
        destroyer: Joi.object({
            minAmount: Joi.number().allow(null, ``).min(0),
            maxAmount: Joi.number().allow(null, ``).min(0)
        }),
        corvette: Joi.object({
            minAmount: Joi.number().allow(null, ``).min(0),
            maxAmount: Joi.number().allow(null, ``).min(0)
        }),
        battleship: Joi.object({
            minAmount: Joi.number().allow(null, ``).min(0),
            maxAmount: Joi.number().allow(null, ``).min(0)
        }),
        stealthBoat: Joi.object({
            minAmount: Joi.number().allow(null, ``).min(0),
            maxAmount: Joi.number().allow(null, ``).min(0)
        }),
        ussZumwalt: Joi.object({
            minAmount: Joi.number().allow(null, ``).min(0),
            maxAmount: Joi.number().allow(null, ``).min(0)
        }),
        aircraftCarrier: Joi.object({
            minAmount: Joi.number().allow(null, ``).min(0),
            maxAmount: Joi.number().allow(null, ``).min(0)
        }),
    }),
    airUnits: Joi.object({
        blackEagle: Joi.object({
            minAmount: Joi.number().allow(null, ``).min(0),
            maxAmount: Joi.number().allow(null, ``).min(0)
        }),
        mig: Joi.object({
            minAmount: Joi.number().allow(null, ``).min(0),
            maxAmount: Joi.number().allow(null, ``).min(0)
        }),
        harrier: Joi.object({
            minAmount: Joi.number().allow(null, ``).min(0),
            maxAmount: Joi.number().allow(null, ``).min(0)
        }),
        hind: Joi.object({
            minAmount: Joi.number().allow(null, ``).min(0),
            maxAmount: Joi.number().allow(null, ``).min(0)
        }),
        siegeChopper: Joi.object({
            minAmount: Joi.number().allow(null, ``).min(0),
            maxAmount: Joi.number().allow(null, ``).min(0)
        }),
        b52Bomber: Joi.object({
            minAmount: Joi.number().allow(null, ``).min(0),
            maxAmount: Joi.number().allow(null, ``).min(0)
        }),
        f22Raptor: Joi.object({
            minAmount: Joi.number().allow(null, ``).min(0),
            maxAmount: Joi.number().allow(null, ``).min(0)
        }),
        f18Hornet: Joi.object({
            minAmount: Joi.number().allow(null, ``).min(0),
            maxAmount: Joi.number().allow(null, ``).min(0)
        })
    }),
    vehUnits: Joi.object({
        tigerTank: Joi.object({
            minAmount: Joi.number().allow(null, ``).min(0),
            maxAmount: Joi.number().allow(null, ``).min(0)
        }),
        mirageTank: Joi.object({
            minAmount: Joi.number().allow(null, ``).min(0),
            maxAmount: Joi.number().allow(null, ``).min(0)
        }),
        teslaTank: Joi.object({
            minAmount: Joi.number().allow(null, ``).min(0),
            maxAmount: Joi.number().allow(null, ``).min(0)
        }),
        ifv: Joi.object({
            minAmount: Joi.number().allow(null, ``).min(0),
            maxAmount: Joi.number().allow(null, ``).min(0)
        }),
        samTank: Joi.object({
            minAmount: Joi.number().allow(null, ``).min(0),
            maxAmount: Joi.number().allow(null, ``).min(0)
        }),
        paladin: Joi.object({
            minAmount: Joi.number().allow(null, ``).min(0),
            maxAmount: Joi.number().allow(null, ``).min(0)
        }),
        blackPanther: Joi.object({
            minAmount: Joi.number().allow(null, ``).min(0),
            maxAmount: Joi.number().allow(null, ``).min(0)
        }),
        m1Tank: Joi.object({
            minAmount: Joi.number().allow(null, ``).min(0),
            maxAmount: Joi.number().allow(null, ``).min(0)
        })
    }),
    infUnits: Joi.object({
        conscript: Joi.object({
            minAmount: Joi.number().allow(null, ``).min(0),
            maxAmount: Joi.number().allow(null, ``).min(0)
        }),
        rifleInfantry: Joi.object({
            minAmount: Joi.number().allow(null, ``).min(0),
            maxAmount: Joi.number().allow(null, ``).min(0)
        }),
        teslaTrooper: Joi.object({
            minAmount: Joi.number().allow(null, ``).min(0),
            maxAmount: Joi.number().allow(null, ``).min(0)
        }),
        rocketeer: Joi.object({
            minAmount: Joi.number().allow(null, ``).min(0),
            maxAmount: Joi.number().allow(null, ``).min(0)
        }),
        gi: Joi.object({
            minAmount: Joi.number().allow(null, ``).min(0),
            maxAmount: Joi.number().allow(null, ``).min(0)
        }),
        guardianGi: Joi.object({
            minAmount: Joi.number().allow(null, ``).min(0),
            maxAmount: Joi.number().allow(null, ``).min(0)
        }),
        machineGunners: Joi.object({
            minAmount: Joi.number().allow(null, ``).min(0),
            maxAmount: Joi.number().allow(null, ``).min(0)
        }),
        cyborgCommando: Joi.object({
            minAmount: Joi.number().allow(null, ``).min(0),
            maxAmount: Joi.number().allow(null, ``).min(0)
        })
    }),
    buildings: Joi.object({
        missileSilo: Joi.object({
            minAmount: Joi.number().allow(null, ``).min(0),
            maxAmount: Joi.number().allow(null, ``).min(0)
        }),
        commandCenter: Joi.object({
            minAmount: Joi.number().allow(null, ``).min(0),
            maxAmount: Joi.number().allow(null, ``).min(0)
        }),
        shipyard: Joi.object({
            minAmount: Joi.number().allow(null, ``).min(0),
            maxAmount: Joi.number().allow(null, ``).min(0)
        }),
        airfield: Joi.object({
            minAmount: Joi.number().allow(null, ``).min(0),
            maxAmount: Joi.number().allow(null, ``).min(0)
        }),
        warfactory: Joi.object({
            minAmount: Joi.number().allow(null, ``).min(0),
            maxAmount: Joi.number().allow(null, ``).min(0)
        }),
        barracks: Joi.object({
            minAmount: Joi.number().allow(null, ``).min(0),
            maxAmount: Joi.number().allow(null, ``).min(0)
        }),
        powerplant: Joi.object({
            minAmount: Joi.number().allow(null, ``).min(0),
            maxAmount: Joi.number().allow(null, ``).min(0)
        }),
        advancedPowerplant: Joi.object({
            minAmount: Joi.number().allow(null, ``).min(0),
            maxAmount: Joi.number().allow(null, ``).min(0)
        }),
        torpedoLauncher: Joi.object({
            minAmount: Joi.number().allow(null, ``).min(0),
            maxAmount: Joi.number().allow(null, ``).min(0)
        }),
        samSite: Joi.object({
            minAmount: Joi.number().allow(null, ``).min(0),
            maxAmount: Joi.number().allow(null, ``).min(0)
        }),
        missileTurret: Joi.object({
            minAmount: Joi.number().allow(null, ``).min(0),
            maxAmount: Joi.number().allow(null, ``).min(0)
        }),
        machinegunTurret: Joi.object({
            minAmount: Joi.number().allow(null, ``).min(0),
            maxAmount: Joi.number().allow(null, ``).min(0)
        }),
        ams: Joi.object({
            minAmount: Joi.number().allow(null, ``).min(0),
            maxAmount: Joi.number().allow(null, ``).min(0)
        })
    }),
    land: Joi.object({
        amount: Joi.number().allow(null, ``).min(0)
    }),
    ppeActive: Joi.number()
})

const buildingSchema = Joi.object({
    missileSilo: Joi.object({
        amount: Joi.number().allow(null, ``).min(0)
    }),
    commandCenter: Joi.object({
        amount: Joi.number().allow(null, ``).min(0)
    }),
    shipyard: Joi.object({
        amount: Joi.number().allow(null, ``).min(0)
    }),
    airfield: Joi.object({
        amount: Joi.number().allow(null, ``).min(0)
    }),
    warfactory: Joi.object({
        amount: Joi.number().allow(null, ``).min(0)
    }),
    barracks: Joi.object({
        amount: Joi.number().allow(null, ``).min(0)
    }),
    powerplant: Joi.object({
        amount: Joi.number().allow(null, ``).min(0)
    }),
    advancedPowerplant: Joi.object({
        amount: Joi.number().allow(null, ``).min(0)
    }),
    torpedoLauncher: Joi.object({
        amount: Joi.number().allow(null, ``).min(0)
    }),
    samSite: Joi.object({
        amount: Joi.number().allow(null, ``).min(0)
    }),
    missileTurret: Joi.object({
        amount: Joi.number().allow(null, ``).min(0)
    }),
    machinegunTurret: Joi.object({
        amount: Joi.number().allow(null, ``).min(0)
    }),
    ams: Joi.object({
        amount: Joi.number().allow(null, ``).min(0)
    })
});

const seaUnitSchema = Joi.object({
    submarine: Joi.object({
        amount: Joi.number().allow(null, ``).min(0)
    }),
    cruiser: Joi.object({
        amount: Joi.number().allow(null, ``).min(0)
    }),
    seaScorpion: Joi.object({
        amount: Joi.number().allow(null, ``).min(0)
    }),
    destroyer: Joi.object({
        amount: Joi.number().allow(null, ``).min(0)
    }),
    corvette: Joi.object({
        amount: Joi.number().allow(null, ``).min(0)
    }),
    battleship: Joi.object({
        amount: Joi.number().allow(null, ``).min(0)
    }),
    stealthBoat: Joi.object({
        amount: Joi.number().allow(null, ``).min(0)
    }),
    ussZumwalt: Joi.object({
        amount: Joi.number().allow(null, ``).min(0)
    }),
    aircraftCarrier: Joi.object({
        amount: Joi.number().allow(null, ``).min(0)
    })
});

const airUnitSchema = Joi.object({
    spyPlane: Joi.object({
        amount: Joi.number().allow(null, ``).min(0)
    }),
    blackEagle: Joi.object({
        amount: Joi.number().allow(null, ``).min(0)
    }),
    mig: Joi.object({
        amount: Joi.number().allow(null, ``).min(0)
    }),
    harrier: Joi.object({
        amount: Joi.number().allow(null, ``).min(0)
    }),
    hind: Joi.object({
        amount: Joi.number().allow(null, ``).min(0)
    }),
    siegeChopper: Joi.object({
        amount: Joi.number().allow(null, ``).min(0)
    }),
    b52Bomber: Joi.object({
        amount: Joi.number().allow(null, ``).min(0)
    }),
    f22Raptor: Joi.object({
        amount: Joi.number().allow(null, ``).min(0)
    }),
    f18Hornet: Joi.object({
        amount: Joi.number().allow(null, ``).min(0)
    })
})

const vehUnitSchema = Joi.object({
    tigerTank: Joi.object({
        amount: Joi.number().allow(null, ``).min(0)
    }),
    mirageTank: Joi.object({
        amount: Joi.number().allow(null, ``).min(0)
    }),
    teslaTank: Joi.object({
        amount: Joi.number().allow(null, ``).min(0)
    }),
    ifv: Joi.object({
        amount: Joi.number().allow(null, ``).min(0)
    }),
    samTank: Joi.object({
        amount: Joi.number().allow(null, ``).min(0)
    }),
    paladin: Joi.object({
        amount: Joi.number().allow(null, ``).min(0)
    }),
    blackPanther: Joi.object({
        amount: Joi.number().allow(null, ``).min(0)
    }),
    m1Tank: Joi.object({
        amount: Joi.number().allow(null, ``).min(0)
    })
});

const infUnitSchema = Joi.object({
    thief: Joi.object({
        amount: Joi.number().allow(null, ``).min(0)
    }),
    saboteur: Joi.object({
        amount: Joi.number().allow(null, ``).min(0)
    }),
    sniper: Joi.object({
        amount: Joi.number().allow(null, ``).min(0)
    }),
    spy: Joi.object({
        amount: Joi.number().allow(null, ``).min(0)
    }),
    conscript: Joi.object({
        amount: Joi.number().allow(null, ``).min(0)
    }),
    rifleInfantry: Joi.object({
        amount: Joi.number().allow(null, ``).min(0)
    }),
    teslaTrooper: Joi.object({
        amount: Joi.number().allow(null, ``).min(0)
    }),
    rocketeer: Joi.object({
        amount: Joi.number().allow(null, ``).min(0)
    }),
    gi: Joi.object({
        amount: Joi.number().allow(null, ``).min(0)
    }),
    guardianGi: Joi.object({
        amount: Joi.number().allow(null, ``).min(0)
    }),
    machineGunners: Joi.object({
        amount: Joi.number().allow(null, ``).min(0)
    }),
    cyborgCommando: Joi.object({
        amount: Joi.number().allow(null, ``).min(0)
    }),
})

const missileSchema = Joi.object({
    nuclearMissile: Joi.object({
        amount: Joi.number().allow(null, ``).min(0)
    }),
    chemicalMissile: Joi.object({
        amount: Joi.number().allow(null, ``).min(0)
    }),
    biochemicalMissile: Joi.object({
        amount: Joi.number().allow(null, ``).min(0)
    }),
    moab: Joi.object({
        amount: Joi.number().allow(null, ``).min(0)
    }),
    empMissile: Joi.object({
        amount: Joi.number().allow(null, ``).min(0)
    })
})

const landSchema = Joi.object({
    land: Joi.number().allow(null, ``).min(0)
})

const userSchema = Joi.object({
    email: Joi.string().required().email({ minDomainSegments: 2 }).escapeHTML(),
    username: Joi.string().required().escapeHTML(),
    password: Joi.string().required().escapeHTML()
    
})

module.exports = {
    enemySchema,
    buildingSchema,
    seaUnitSchema,
    airUnitSchema,
    vehUnitSchema,
    infUnitSchema,
    missileSchema,
    landSchema,
    userSchema
}

