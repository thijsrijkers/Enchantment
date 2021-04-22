//To run first compile the ts file with: tsc Server/server.ts 
//Then after it was succesfull, run this: node Server/server.js

//use this for module: npm install @types/node --save-
import * as net from 'net';

const PORT = 3000
const IP = '127.0.0.1'
const BACKLOG = 100

//TODO: Fix that Node keeps running when someone tries to refresh there minecraft client.
net.createServer()
  .listen(PORT, IP, BACKLOG)
  .on('connection', socket => socket  
	.on('data', buffer => {
		console.log('Connection Made')
		const request = buffer.toString()
		socket.write(compileResponse({
		protocol: 'HTTP/1.1',
		headers: new Map(),
		status: 'OK',
		statusCode: 200,
		body: `Test`
	}))
	socket.end()
}))

export interface Request {
	protocol: string
	method: string
	url: string
	headers: Map<string, string>
	body: string
}

export interface Response {
	status: string
	statusCode: number
	protocol: string
	headers: Map<string, string>
	body: string
}
  
const compileResponse = (r: Response): string => `${r.protocol} ${r.statusCode} ${r.status}
${Array.from(r.headers).map(kv => `${kv[0]}: ${kv[1]}`).join('\r\n')}
${r.body}`

