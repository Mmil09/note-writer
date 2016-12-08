
const keyCodeButtonIndexes = {
	72: 0,  //h degree 1 to start 
	74: 2, //j degree 3 to start
	75: 4, //k degree 5 to start
	76: 6, //l degree 7 to start
	89: 1, //y degree 2 to start
	85: 3, //u degree 4 to start
	73: 5, //i degree 6 to start
	79: 7, //o degree 8 to start
	
	66: 8, //shift, bass rote note
}

const keyCodePositionIndexes = {
	70: 0, //f key, position 1,
	68: 1, //d key, position 2,
	83: 2, //s key, position 3,
	65: 3, //a key, position 4,
	82: 4, //r key, position 5,
	69: 5, //e key, position 6,
	87: 6, //w key, position 7,
	81: 7, //q key, position 8,
}

const keyCodeOctaveIndexes = {
	49: 0, //1 key
	50: 1, //2 key
	51: 2, //3 key
	52: 3, //4 key
	53: 4, //5 key
	54: 5, //6 key
	55: 6, //7 key
	56: 7, //8 key
	57: 8, //9 key

	// 90: 1, //z key
	// 88: 2, //x key
	// 67: 3, //c key
	// 86: 4, //v key
	// 66: 5, //b key
	// 78: 6, //n key
	// 77: 7, //m key
}

function keyboardBindings() {

	var self = this;
	var socket = this.socket;

	document.addEventListener('keydown', function(e) {
		var buttonIndex = keyCodeButtonIndexes[e.keyCode]

		if (buttonIndex !== undefined) {
			socket.emit('note_button_down', {
				noteButtonIndex: buttonIndex,
				velocity: self.state.velocity,
				channel: self.state.channel,
			})
		}
	})

	document.addEventListener('keyup', function(e) {
		var buttonIndex = keyCodeButtonIndexes[e.keyCode]
		var positionIndex = keyCodePositionIndexes[e.keyCode];

		if (buttonIndex !== undefined) {
			socket.emit('note_button_up', {
				noteButtonIndex: buttonIndex,
				velocity: self.state.velocity,
				channel: self.state.channel,
			})
			return;
		}
	})

	document.addEventListener('keydown', function(e) {
		var positionIndex = keyCodePositionIndexes[e.keyCode];

		if (positionIndex !== undefined) {
			socket.emit('position_change', positionIndex)
		}
	})

	document.addEventListener('keydown', function(e) {
		var octaveIndex = keyCodeOctaveIndexes[e.keyCode];

		if (octaveIndex !== undefined) {
			socket.emit('octave_change', octaveIndex)
		}
	})

	document.addEventListener('keydown', function(e) {
		var octaveUpKeyCode = 187
		var octaveDownKeyCode = 189
		var positionUpKeyCode = 221
		var positionDownKeyCode = 219

		if (e.keyCode === positionUpKeyCode) {
			socket.emit('increment_position')
		}

		if (e.keyCode === positionDownKeyCode) {
			socket.emit('decrement_position')
		}

		if (e.keyCode === octaveUpKeyCode) {
			socket.emit('increment_octave')
		}

		if (e.keyCode === octaveDownKeyCode) {
			socket.emit('decrement_octave')
		}
	})

	function constrainValue(value, min, max) {
		if (value > max) {
			return min
		}
		else if (value < min) {
			return max
		}
		else {
			return value
		}
	}
}

export default keyboardBindings