let modInfo = {
	name: "RPG Tree",
	id: "RPGTree-JmeJuniper",
	author: "JmeJuniper",
	pointsName: "XP",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 0,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "1",
	name: "RPG.init()",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v1 - RPG.init()</h3><br>
		- Oh hey, there's a game here<br>
		- Added coin layer with 4 upgrades.<br>
		- Added summons layer.<br>
		- Oops, looks like I coded bad. RESET EVERYTHING<br>
		- Added coin layer. Does absolutely nothing.<br>
		- Added stats layer, with some stat point buyables.<br>
		- Edited this changelog`

let winText = `GG! You beat this RPG thingy!`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(0.1)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}
