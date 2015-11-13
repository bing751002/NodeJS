 var mosca = require('mosca')
   
 var settings = {
   port: 1884,
 http: {
     port: 1885,
     bundle: true,
     static: './'
   }
 };

//here we start mosca
var server = new mosca.Server(settings);

server.on('clientConnected', function (client) {
    console.log('client connected', client.id);
});

// fired when a message is received
server.on('published', function (packet, client) {
    console.log('receive', packet.topic ,packet.payload.length);
});

server.on('clientDisconnected', function (client) {
    console.log('cliend clientDisconnected:', client.id);
});


server.on('ready', setup);

process.on('uncaughtException', function (err) {
    console.log(err);
}); 

// fired when the mqtt server is ready
function setup() {
    console.log('Mosca server is up and running');
}