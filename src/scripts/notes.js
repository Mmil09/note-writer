var notes = {
	'C': 0,
	'C#': 1,
	'D': 2,
	'D#': 3,
	'E': 4,
	'F': 5,
	'F#': 6, 
	'G': 7,
	'G#': 8,
	'A': 9,
	'A#': 10,
	'B': 11,
}


var handler = {
    get: function(target, noteName) {
    		if (noteName in target) {
    			return target[noteName]
    		}
    		else {
    			console.log('TODO: proxy other alternative note names')
    			return null;
    		}
    }
}

module.exports = new Proxy(notes, handler)