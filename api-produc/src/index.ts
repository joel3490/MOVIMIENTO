import { auth } from "./handelers/authController";
import serverMov from "./server";
import color from 'colours'

const http = require('http')
const server = http.createServer(serverMov)


const io = require  ('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']   
    } 
})

io.on('connection', (socket)=>{

    //console.log('Conexión aceptada:', socket.handshake.query.auth_token);

    const [valido, id_oaci] = auth.verificarJWT(socket.handshake.query.auth_token)

if(!valido){
    console.log('socket no identificado')
    return socket.disconnect()
}    
    console.log('se conecto un cliente', id_oaci); 
    
    socket.on('enviarMov',(data)=>{
        console.log(data)
        socket.broadcast.emit('enviarMov', data)
        //io.emit('enviarMov', data) //para q llegue el dato para quien envia tambien
    })

    socket.on('disconnect', () => {
        console.log('Cliente desconectado', id_oaci);
    });
    
})

server.listen(3000, ()=>{
    console.log(color.cyan('desde el puerto 3000'))
})