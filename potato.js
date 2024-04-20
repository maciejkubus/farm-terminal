class Potato {
	x = null;
	y = null;
	emoji = '🥔';
	rawEmoji = '🟩';
	dryEmoji = '🟢';
	watered = false;
	mature = false
	matureTime = 15000

	constructor(x, y) {
		this.x = x
		this.y = y
	}

	water() {
		this.watered = true
		setTimeout(() => {
			this.mature = true
		}, this.matureTime)
	}

	getEmoji() {
		if(this.mature) {
			return this.emoji
		} 
		else if(this.watered) {
			return this.rawEmoji
		}
		else {
			return this.dryEmoji
		}
	}

	harvest() {
		this.x = -1
		this.y = -1
		return 'potato'
	}
}

module.exports = Potato