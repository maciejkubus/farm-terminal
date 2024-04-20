class Egg {
	x = null;
	y = null;
	emoji = '🥚';
	rawEmoji = '🟩';
	mature = false
	matureTime = 0

	constructor(x, y) {
		this.x = x
		this.y = y

		setTimeout(() => {
			this.mature = true
		}, this.matureTime)
	}

	water() {
		
	}

	getEmoji() {
		if(this.mature) {
			return this.emoji
		} else {
			return this.rawEmoji
		}
	}

	harvest() {
		this.x = -1
		this.y = -1
		return 'egg'
	}
}

module.exports = Egg