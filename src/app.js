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
    publicDir = path.join(__dirname, 'public')


app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


app.use(errorHandler({
  dumpExceptions: true,
  showStack: true
}));

var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(socketPort);

io.on('connection', function (socket) {
  
  socket.emit('news', { hello: 'world' });
  
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')


app.get("/", function (req, res) {
  res.render('index', {socketUrl: socketUrl});
});


app.use(express.static(publicDir));

console.log("Server listening on port %s", port);
app.listen(port, hostname);