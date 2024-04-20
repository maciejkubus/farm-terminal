class Mill {
	x = null;
	y = null;
	emoji = '🟡';
	craftCallback = null;
	time = 5000;
	busy = false

	constructor(x, y, callback) {
		this.x = x;
		this.y = y;
		this.craftCallback = callback
	}

	craft() {
		if(this.busy) return;
		this.busy = true
		this.emoji = '🟨'
		setTimeout(() => {
			this.craftCallback()
			this.emoji = '🟡'
			this.busy = false
		}, this.time)
	}

	use(player) {
		if(player.x == this.x && player.y == this.y) {
			this.craft()
		}
	}
}

module.exports = Mill