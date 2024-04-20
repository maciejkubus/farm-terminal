function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

class Dog {
	x = null;
	y = null;
	moveX = -1;
	moveY = 0;
	emoji = '🐕';

	constructor(x, y) {
		this.x = x
		this.y = y

		this.changeDirection()
	}
	
	changeDirection() {
		this.moveX = random(-1, 1)

		setTimeout(() => this.changeDirection(), random(500, 2500))
	}

	move(map) {
		let prevPosition = { x: this.x, y: this.y }
		
		this.x += this.moveX
		this.y += this.moveY
		this.moveX = 0
		this.moveY = 0

		const tile = map.find(tile => tile.x == this.x && tile.y == this.y)
		
		if(tile.tile != '⬛' || this.x < 14 || this.x > 21) {
			this.x = prevPosition.x;
			this.y = prevPosition.y;
		}
	}
}

module.exports = Dog