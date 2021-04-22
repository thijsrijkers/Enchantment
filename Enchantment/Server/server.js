"use strict";
//To run first compile the ts file with: tsc Server/server.ts 
//Then after it was succesfull, run this: node Server/server.js
exports.__esModule = true;
//use this for module: npm install @types/node --save-
var net = require("net");
var PORT = 3000;
var IP = '127.0.0.1';
var BACKLOG = 100;
net.createServer()
    .listen(PORT, IP, BACKLOG)
    .on('connection', function (socket) { return socket
    .on('data', function (buffer) {
    console.log('Connection Made');
    var request = buffer.toString();
    socket.write(compileResponse({
        protocol: 'HTTP/1.1',
        headers: new Map(),
        status: 'OK',
        statusCode: 200,
        body: "{\n\t\t\t\"version\": {\n\t\t\t\t\"name\": \"1.16.5\",\n\t\t\t\t\"protocol\": 47\n\t\t\t},\n\t\t\t\t\"players\": {\n\t\t\t\t\t\"max\": 100,\n\t\t\t\t\t\"online\": 0,\n\t\t\t\t\t\"sample\": [\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\"name\": \"thinkofdeath\",\n\t\t\t\t\t\t\t\"id\": \"4566e69f-c907-48ee-8d71-d7ba5aa00d20\"\n\t\t\t\t\t\t}\n\t\t\t\t\t]\n\t\t\t\t},\n\t\t\t\t\"description\": {\n\t\t\t\t\t\"text\": \"Hello world\"\n\t\t\t\t},\n\t\t\t\t\"favicon\": \"data:image/png;base64,<data>\"\n\t\t\t}"
    }));
    socket.end();
}); });
var compileResponse = function (r) { return r.protocol + " " + r.statusCode + " " + r.status + "\n" + Array.from(r.headers).map(function (kv) { return kv[0] + ": " + kv[1]; }).join('\r\n') + "\n" + r.body; };
