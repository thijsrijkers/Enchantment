//To run first compile the ts file with: tsc Server/server.ts 
//Then after it was succesfull, run this: node Server/server.js

//use this for module: npm install @types/node --save-
import * as net from 'net';

const PORT = 3000
const IP = '127.0.0.1'
const BACKLOG = 100
const waitTime = 500

let body = {
  version: {
      name: "1.16.5",
      protocol: 47
  },
  players: {
      max: 100,
      online: 5,
      sample: [
          {
              name: "thinkofdeath",
              id: "4566e69f-c907-48ee-8d71-d7ba5aa00d20"
          }
      ]
  },
  description: {
      text: "Enchantment"
  },
  favicon: "data:image/png;base64,<data>"
};

const server = net.createServer()

console.log("\n" +
"▄███▄      ▄   ▄█▄     ▄  █ ██      ▄     ▄▄▄▄▀ █▀▄▀█ ▄███▄      ▄     ▄▄▄▄▀\n" +
"█▀   ▀      █  █▀ ▀▄  █   █ █ █      █ ▀▀▀ █    █ █ █ █▀   ▀      █ ▀▀▀ █\n" +
"██▄▄    ██   █ █   ▀  ██▀▀█ █▄▄█ ██   █    █    █ ▄ █ ██▄▄    ██   █    █\n" +
"█▄   ▄▀ █ █  █ █▄  ▄▀ █   █ █  █ █ █  █   █     █   █ █▄   ▄▀ █ █  █   █\n" +
"▀███▀   █  █ █ ▀███▀     █     █ █  █ █  ▀         █  ▀███▀   █  █ █  ▀ \n" +
"        █   ██          ▀     █  █   ██           ▀           █   ██\n" +
"                             ▀ \n\n");

//TODO: socket.end() crashes the nodejs server
server.on("connection", socket => {
    console.log('A new connection')

    socket.on('data', buffer => {

        setTimeout( () => {           
            socket.write(compileResponse({
                protocol: '47',
                body: JSON.stringify(body)
              }))

            console.log('done with connection')
            //socket.end()
        }, waitTime );
    })
});

server.on('close', function() {
	console.log('Connection closed');
});

server.listen(PORT, IP, BACKLOG, function() {
  console.log("Server listening to port %j", server.address());
});

export interface Request {
    protocol: string
    method: string
    url: string
    headers: Map<string, string>
    body: string
}

export interface Response {
    protocol: string
    body: string
}
  
  const compileResponse = (r: Response): string => `${r.protocol} 
  ${r.body}`