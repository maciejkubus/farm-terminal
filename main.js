const readline = require('readline')
const Peas = require('./peas')
const Potato = require('./potato')
const house = require('./house')
const Wheat = require('./wheat')
const Chicken = require('./chicken')
const Dog = require('./dog')
const Egg = require('./egg')
const Mill = require('./mill')
const Furnace = require('./furnace')

const instruction = [
	'INSTRUKCJA',
	'[1] - Groszek',
	'[2] - Ziemniak',
	'[3] - Zboże',
	'[ENTER] - Użyj/Zbierz',
	'[SPACJA] - Podlej',
	' ',
	'Recepturki',
	' ',
	'🟡 | 🟨 -> 📦',
	'🟤 | 📦 + 🥚 -> 🍞',
	' ',
	' ',
	' ',
	'Farma by Maciek & Astoria'
]

const map = []
const mapSize = {
	width: 64,
	height: 14,
}

const plants = []
const inventory = {
	peas: {
		amount: 0,
		emoji: '🫛 '
	},
	potato: {
		amount: 0,
		emoji: '🥔'
	},
	wheat: {
		amount: 0,
		emoji: '🟨'
	},
	egg: {
		amount: 0,
		emoji: '🥚'
	},
	flour: {
		amount: 0,
		emoji: '📦'
	},
	bread: {
		amount: 0,
		emoji: '🍞'
	}
}
const animals = [
	new Chicken(40, 4),
	new Chicken(45, 12),
	new Chicken(50, 6),
	new Chicken(55, 5),
	new Chicken(60, 8),
	new Dog(16, 3)
]

const machines = [
	new Mill(15, 11, () => {
		if(inventory.wheat.amount > 0) {
			inventory.flour.amount++
			inventory.wheat.amount--
		}
	}),
	new Furnace(15, 10, () => {
		if(inventory.flour.amount > 0 && inventory.egg.amount > 0) {
			inventory.bread.amount++
			inventory.flour.amount--
			inventory.egg.amount--
		}
	})
]

const player = {
	x: 1,
	y: 1,
	keys: ['w', 'a', 's', 'd'],
	move: function(key) {
		let newPosition = { x: 0, y: 0 }
		if(key == 'w') {
			newPosition = { x: this.x, y: this.y -1 }
		}
		if(key == 's') {
			newPosition = { x: this.x, y: this.y +1 }
		}
		if(key == 'a') {
			newPosition = { x: this.x -1, y: this.y }
		}
		if(key == 'd') {
			newPosition = { x: this.x +1, y: this.y }
		}

		const tile = map.find(tile => tile.x == newPosition.x && tile.y == newPosition.y)

		if(tile.tile == '⬛') {
			this.x = newPosition.x
			this.y = newPosition.y
		}
	},
}

const generateMap = () => {
	for(let y = 0; y <= mapSize.height; y++) {
		for(let x = 0; x <= mapSize.width; x++) {
			if(x == 0 || x == mapSize.width || y == 0 || y == mapSize.height) {
				map.push({ x: x, y: y, tile: '⬜' })
			}
			else if(house.find(part => part.x == x && part.y == y)) {
				map.push({ x: x, y: y, tile: '🧱' })
			}
			else {
				map.push({ x: x, y: y, tile: '⬛' })
			}
		}
	}
}

const drawUI = () => {
	let line = ""
	for (const key in inventory) {
		const item = inventory[key]
		line += item.emoji + " - " + item.amount + " | "
	}
	console.log(line)
}

const draw = () => {
	for(let y = 0; y <= mapSize.height; y++) {
		let line = "";
		for(let x = 0; x <= mapSize.width; x++) {
			const plant = plants.find(p => p.x == x && p.y == y)
			const animal = animals.find(p => p.x == x && p.y == y)
			const machine = machines.find(p => p.x == x && p.y == y)
			
			if(player.x == x && player.y == y) {
				line += '🟥'
			}
			else if(machine) {
				line += machine.emoji
			}
			else if(animal) {
				line += animal.emoji
			}
			else if(plant) {
				line += plant.getEmoji()
			}
			else {
				const tile = map.find(tile => tile.x == x && tile.y == y);
				line += tile.tile
			}
		}
		if(instruction[y]) {
			line += ' | ' + instruction[y]
		}
		console.log(line)
	}
}

const update = () => {
	console.clear()
	draw()
	drawUI()

	animals.forEach(animal => {
		animal.move(map)
		if(animal.egg) {
			animal.egg = false
			plants.push(new Egg(animal.x, animal.y))
		}
	})
}

const harvest = () => {
	plants.forEach(plant => {
		if(plant.x == player.x && plant.y == player.y && plant.mature) {
			inventory[plant.harvest()].amount++
		} 
	})
}

const main = () => {
	readline.emitKeypressEvents(process.stdin);

	if (process.stdin.isTTY)
			process.stdin.setRawMode(true);

	process.stdin.on('keypress', (chunk, key) => {
		if(key.name == 'q') {
			process.exit()
		}
		if(player.keys.includes(key.name)) {
			player.move(key.name)
		}
		if(key.name == 'return') {
			harvest()
			machines.forEach(machine => {
				machine.use(player)
			})
		}
		if(key.name == 'space') {
			plants.forEach(plant => {
				if(player.x == plant.x && player.y == plant.y) {
					plant.water()
				}
			})
		}
		if(key.name == '1') {
			plants.push(new Peas(player.x, player.y))
		}
		if(key.name == '2') {
			plants.push(new Potato(player.x, player.y))
		}
		if(key.name == '3') {
			plants.push(new Wheat(player.x, player.y))
		}
	});

	setInterval(update, 50)
	generateMap()
}

main();