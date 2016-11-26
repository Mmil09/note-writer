var express = require("express"),
    app = express(),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler'),
    methodOverride = require('method-override'),
    hostname = process.env.HOSTNAME || 'localhost',
    port = parseInt(process.env.PORT, 10) || 3001,
    socketPort = 8080,
    socketUrl = 'http://' + hostname + ':' + socketPort,
    path = require('path'),
    publicDir = path.join(__dirname, 'public'),
    socket = require('./scripts/socket')


app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


app.use(errorHandler({
  dumpExceptions: true,
  showStack: true
}));

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.get("/", function (req, res) {
  var noteWriter = socket.getNoteWriter();
  var initialConfig = noteWriter.getConfig();
  var initialNoteButtons = noteWriter.getNoteButtons()
  
  res.render('index', {
    socketUrl: socketUrl,
    initialConfig: initialConfig,
    initialNoteButtons: initialNoteButtons,
  });
  
});


app.use(express.static(publicDir));

console.log("Server listening on port %s", port);

app.listen(port, hostname);


socket.setupSocket(app, socketPort)


