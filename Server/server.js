"use strict";
//To run first compile the ts file with: tsc Server/server.ts 
//Then after it was succesfull, run this: node Server/server.js
exports.__esModule = true;
//use this for module: npm install @types/node --save-
var net = require("net");
var wp = require("workerpool");
var workerpool = wp.pool();
var PORT = 3000;
var IP = '127.0.0.1';
var BACKLOG = 100;
//TODO: Fix that Node keeps running when someone tries to refresh there minecraft client.
net.createServer()
    .listen(PORT, IP, BACKLOG)
    .on('connection', function (socket) {
    console.log('new connection');
    socket
        .on('data', function (buffer) {
        console.log('data');
        workerpool.exec(function () { return fibonacci(100); }, [])
            .then(function (res) {
            socket.write(res);
            console.log('done with connection');
            socket.end();
        });
    });
});
var fibonacci = function (n) { return (n < 2) ? n
    : fibonacci(n - 2) + fibonacci(n - 1); };
var compileResponse = function (r) { return r.protocol + " " + r.statusCode + " " + r.status + "\n" + Array.from(r.headers).map(function (kv) { return kv[0] + ": " + kv[1]; }).join('\r\n') + "\n" + r.body; };
