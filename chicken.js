function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

class Chicken {
	x = null;
	y = null;
	moveX = 0;
	moveY = 0;
	emoji = '🐔';
	egg = false;

	constructor(x, y) {
		this.x = x
		this.y = y

		this.changeDirection()
		setInterval(() => {
			this.egg = true
		}, random(50000, 150000))
	}
	
	changeDirection() {
		this.moveX = random(-1, 1)
		this.moveY = random(-1, 1)
		setTimeout(() => this.changeDirection(), random(500, 2500))
	}

	move(map) {
		let prevPosition = { x: this.x, y: this.y }
		
		this.x += this.moveX
		this.y += this.moveY
		this.moveX = 0
		this.moveY = 0

		const tile = map.find(tile => tile.x == this.x && tile.y == this.y)
		
		if(tile.tile != '⬛') {
			this.x = prevPosition.x;
			this.y = prevPosition.y;
		}
	}
}

module.exports = Chicken