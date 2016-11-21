import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import noteButton from './scripts/noteButton'
import NoteWriter from './scripts/noteWriter'
import triggerEvents from './scripts/triggerEvents'
import listenEvents from './scripts/listenEvents'

// request MIDI access
if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess({
        sysex: false // this defaults to 'false' and we won't be covering sysex in this article. 
    }).then(onMIDISuccess, onMIDIFailure);
} else {
    alert("No MIDI support in your browser.");
}

// midi functions
function onMIDISuccess(midiAccess) {
    // when we get a succesful response, run this code
    console.log('MIDI Access Object', midiAccess);

    midiAccess.outputs.forEach(function(output) {
    	console.log(output)
    })
}

function onMIDIFailure(e) {
    // when we get a failed response, run this code
    console.log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + e);
}



const noteWriter = new NoteWriter();

triggerEvents(noteWriter)
listenEvents(noteWriter)
	
ReactDOM.render(<App noteWriter={noteWriter}/>, document.getElementById('root'));



