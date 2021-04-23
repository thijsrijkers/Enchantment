//To run first compile the ts file with: tsc Server/server.ts 
//Then after it was succesfull, run this: node Server/server.js

//use this for module: npm install @types/node --save-
import * as net from 'net';
import * as wp from 'workerpool'

const workerpool = wp.pool()

const PORT = 3000
const IP = '127.0.0.1'
const BACKLOG = 100

net.createServer()
  .listen(PORT, IP, BACKLOG)
  .on('connection', socket => {
    console.log('new connection')
    socket
      .on('data', buffer => {
        console.log('data')
        workerpool.exec(() => fibonacci(100), [])
          .then(res => {
            socket.write(res)
            console.log('done with connection')
            socket.end()
		})
	})
})

const fibonacci = (n: number) => (n < 2) ? n
  : fibonacci(n - 2) + fibonacci(n - 1)

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

