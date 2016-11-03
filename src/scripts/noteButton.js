function NoteButton() {
	this.isPushed = false;
	this.degree = 0;
	this.value = 0;
}

NoteButton.prototype.setButtonDown = function() {
	var stateChanged;

	if (this.isPushed) {
		stateChanged = false;
	}
	else {
		this.isPushed = true;
		stateChanged = true;
	}

	return stateChanged;
}

NoteButton.prototype.setButtonUp = function() {
	var stateChanged;
	
	if (!this.isPushed) {
		stateChanged = false;
	}
	else {
		this.isPushed = false;
		stateChanged = true;
	}

	return stateChanged;
}

NoteButton.prototype.setNoteValue = function(newNotevalue) {
	if (this.isPushed) {
		//turn off previous note, then
		this.value = newNotevalue;
		//play new note
	}
	else {
		this.value = newNotevalue;
	}

}

module.exports = NoteButton

