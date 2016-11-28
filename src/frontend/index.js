import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap - http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

require('../public/stylesheets/index.styl')

ReactDOM.render(
	<App 
		socketUrl={window.SOCKET_URL}
		initialConfig={window.INITIAL_CONFIG}
		initialNoteButtons={window.INITIAL_NOTE_BUTTONS}
	/>,
	document.getElementById('root')
);





