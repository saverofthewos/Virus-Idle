addLayer("rat", {
    name: "rat", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(5), // Can be a function that takes requirement increases into account
    resource: "Rats", // Name of prestige currency
    baseResource: "viruses", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('rat', 14)) mult = mult.times(upgradeEffect('rat', 14))
        if (hasUpgrade('rat', 15)) mult = mult.times(upgradeEffect('rat', 15))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "r", description: "R: turn your viruses into a rat", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        11: {
        title: "computer mouse",
        description: "make your rat twice as rat",
        cost: new Decimal(1),
        },
        12: {
            title: "ratrus",
            description: "make your [REDACTED] twice as [REDACTED]",
            cost: new Decimal(5),
        },
        13: {
            title: "rat employment",
            description: "make your rats employed in virusland",
            cost: new Decimal(10),
            effect() {
                return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        14: {
            title: "lossless virus-rat conversion",
            description: "viruses now convert to rats without losing the virus",
            cost: new Decimal(25),
            effect() {
                return player.points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        15: {
            title: "computer rat",
            description: "explosive rat production",
            cost: new Decimal(50),
            effect() {
                return player.points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
    },
    layerShown(){return true}
})
