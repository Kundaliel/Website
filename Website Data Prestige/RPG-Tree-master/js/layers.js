// CURRENCIES/STATS

addLayer("c", {
	// Display (tree)
	name: "Coins",
	symbol: "C",
	color: "#ff0",
	
	// Display (layer)
	resource: "coins",
	baseResource: "",
	tabFormat: [
		[
			"main-display",
			1
		],
		[
			"display-text",
			"You are gaining X coins per second"
		],
		"blank",
		"blank",
		"upgrades",
		"blank",
		"blank",
		"milestones"
	],
	
	// Position
	row: 0,
	position: 0,
	
	// Start data
	startData() {
		return {
			unlocked: true,
			points: new Decimal(10)
		}
	},
	
	// Resetting basics
	type: "normal",
	
	// Resetting gain calculations
	baseAmount() {
		return new Decimal(1)
	},
	requires: new Decimal(1),
	passiveGeneration() {
		return 1
	}
})

addLayer("s", {
	// Display (tree)
	name: "Stats",
	symbol: "S",
	color: "#ccc",
	
	// Display (layer)
	resource: "stat points",
	prestigeButtonText() {
		return "Reset for +"+getResetGain(this.layer).max(0)+" stat points<br>Next at "+formatWhole(getNextAt(this.layer))+" XP"
	},
	tabFormat: [
		[
			"main-display",
			0
		],
		"prestige-button",
		"blank",
		"blank",
		"buyables",
	],
	
	// Position
	row: 0,
	position: 1,
	
	// Start data
	startData() {
		return {
			unlocked: true,
			points: new Decimal(0),
			total: new Decimal(0),
			atk: new Decimal(1),
			def: new Decimal(0),
			ddg: new Decimal(0),
			mhp: new Decimal(10),
			mag: new Decimal(5),
			eng: new Decimal(3),
		}
	},
	
	// Resetting
	type: "custom",
	baseAmount() {
		return player.points
	},
	getResetGain() {
		return player.points.div(2.5).max(1).log(2).minus(player[this.layer].total).floor();
	},
	getNextAt() {
		return new Decimal(5).mul(new Decimal(2).pow(player[this.layer].total.add(getResetGain(this.layer).max(0))));
	},
	canReset() {
		return getResetGain(this.layer).gte(1)
	},
	prestigeNotify() {
		return getResetGain(this.layer).gte(1)
	},
	
	// Buyables
	buyables: {
		11: {
			// Visuals
			title: "+Attack",
			display() {
				return "Put one stat point into Attack<br>Currently: "+player[this.layer].atk
			},
			style() {
				return {
					"background":"red"
				}
			},
			
			// Costs
			cost() {
				return new Decimal(1)
				// does nothing, change functions below
			},
			canAfford() {
				return player[this.layer].points.gte(1)
			},
			
			// Buying
			buy() {
				player[this.layer].points = player[this.layer].points.sub(1)
				player[this.layer].atk = player[this.layer].atk.add(1)
			},
			buyMax() {
				player[this.layer].atk = player[this.layer].atk.add(player[this.layer].points)
				player[this.layer].points = new Decimal(0)
			}
		}
	}
})

// LOCATIONS

// addLayer("s", {
// 	name: "Summons", // This is optional, only used in a few places, If absent it just uses the layer id.
// 	symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
// 	position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
// 	startData() { return {
// 		unlocked: true,
// 		points: new Decimal(0),
// 	}},
// 	color: "#707",
// 	requires: function() {
// 		return 20
// 	}, // Can be a function that takes requirement increases into account
// 	resource: "summoning energy", // Name of prestige currency
// 	baseResource: "coins", // Name of resource prestige is based on
// 	baseAmount() {return player.c.points}, // Get the current amount of baseResource
// 	type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
// 	exponent: 1, // Prestige currency exponent
// 	gainMult() { // Calculate the multiplier for main currency from bonuses
// 		var mult = new Decimal(1)
// 		if (hasUpgrade("c", 22)) mult.mul(upgradeEffect("c", 22))
// 		return mult
// 	},
// 	gainExp() { // Calculate the exponent on main currency from bonuses
// 		return new Decimal(1)
// 	},
// 	row: 1, // Row the layer is in on the tree (0 is the first row)
// 	hotkeys: [
// 		{
// 			key: "s", // What the hotkey button is. Use uppercase if it's combined with shift, or "ctrl+x" for holding down ctrl.
// 			description: "S: Purchase Summoning Energy", // The description of the hotkey that is displayed in the game's How To Play tab
// 			onPress() { doReset(this.layer) },
// 			unlocked() {return player[this.layer].unlocked} // Determines if you can use the hotkey, optional
// 		}
// 	],
// 	layerShown(){return hasUpgrade("c", 21)},
// 	upgrades: {
// 	}
// })

// SIDETAB

addLayer("CreditsButton", {
	// Display (tree)
	name: "Credits",
	symbol: "C",
	color: "#666",
	tooltip: "People who made this game possible :D",
	
	// Display (layer)
	tabFormat: [
		[
			"display-text",
			"Game framework",
			{"font-size": "32px", "color": "white"}
		],
		"blank",
		[
			"display-text",
			"Jacorb90 & Aarex",
			{"font-size": "20px", "color": "red"}
		],
		[
			"display-text",
			"(for creating The Prestige Tree)",
			{"font-size": "15px", "color": "white"}
		],
		"blank",
		[
			"display-text",
			"Acamaeda",
			{"font-size": "20px", "color": "red"}
		],
		[
			"display-text",
			"(for creating The Modding Tree)",
			{"font-size": "15px", "color": "white"}
		],
		
		"blank",
		"h-line",
		"blank",
		
		[
			"display-text",
			"People who put up with my non-stop questions on the modding tree discord",
			{"font-size": "32px", "color": "white"}
		],
		"blank",
		[
			"display-text",
			"smily",
			{"font-size": "20px", "color": "red"}
		],
		[
			"display-text",
			"Escapee",
			{"font-size": "20px", "color": "red"}
		],
		[
			"display-text",
			"(genuinely, I cannot explain how helpful everyone here has been. I would never have gotten this far without all of them xD)",
			{"font-size": "15px", "color": "white"}
		],
		
		"blank",
		"h-line",
		"blank",
		
		[
			"display-text",
			"Misc",
			{"font-size": "32px", "color": "white"}
		],
		"blank",
		[
			"display-text",
			"Me (Jme)",
			{"font-size": "20px", "color": "red"}
		],
		[
			"display-text",
			"(I... created this mod. Already listed in \"Info\", so it's kind of redundant, but I figured I'd put it here anyways.)",
			{"font-size": "10px", "color": "white"}
		],
		
		"blank",
		"h-line",
	],
	
	// Position
	row: "side",
	position: 0,
	
	// Resetting
	type: "none",
	
})
