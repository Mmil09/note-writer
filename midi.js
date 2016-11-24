var keypress = require('keypress');
var easymidi = require('easymidi');

var input = new easymidi.Input('Virtual input name', true);
var output = new easymidi.Output('Virtual output name', true);

var inputs = easymidi.getInputs();
var outputs = easymidi.getOutputs();

console.log('inputs', inputs)
console.log('outputs', outputs)

input.on('noteon', function (msg) {
  console.log('message received', msg)
});


// make `process.stdin` begin emitting "keypress" events
keypress(process.stdin);


var noteOn = false;
// listen for the "keypress" event
process.stdin.on('keypress', function (ch, key) {

	var newCmd = noteOn ? 'noteoff' : 'noteon';
	noteOn = !noteOn

  if (key && key.shift && key.name === 'c') {
  	console.log('closing')
		input.close();
		output.close()
		process.exit(0)
  }

  if (key && key.name === 'l') {
  	console.log('sending message')
		output.send(newCmd, {
		  note: 64,
		  velocity: 127,
		  channel: 3
		});
  }
});

process.stdin.setRawMode(true);
process.stdin.resume();