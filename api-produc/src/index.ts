import serverMov from "./server";
import color from 'colours'

const http = require('http')
const server = http.createServer(serverMov)


const io = require  ('socket.io')(server, {
    cors: {origin: '*'}    
})

io.on('connection', (socket)=>{
    console.log('se conecto un cliente');    
})


server.listen(3000, ()=>{
    console.log(color.cyan('desde el puerto 3000'))
})