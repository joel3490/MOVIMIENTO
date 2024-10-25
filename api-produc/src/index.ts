
import { auth } from "./handelers/authController";
import { socketUser } from "./handelers/socket";
import serverMov from "./server";
import color from 'colours'

const http = require('http')
const server = http.createServer(serverMov)


const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})

io.on('connection', async (socket) => {


   /*  io.on('enviarMov', (data) => {
        console.log(data)
        socket.broadcast.emit('enviarMov', data)
        //io.emit('enviarMov', data) //para q llegue el dato para quien envia tambien
    }) */

    //console.log('Conexión aceptada:', socket.handshake.query.auth_token);
    const token = socket.handshake.query.auth_token;

    if (!token) {
        console.log('No se recibió el token');
        return socket.disconnect();
      }

    const [valido, id_oaci] = auth.verificarJWT(socket.handshake.query.auth_token)

    if (!valido) {
        console.log('socket no identificado')
        return socket.disconnect()
    }
    
    await socketUser.usuarioConectado(id_oaci);
    
    console.log('se conecto un cliente', id_oaci);


    io.emit('lista-usuarios', await socketUser.getUserAero())
    

    

    socket.on('disconnect', async() => {
        console.log('Cliente desconectado', id_oaci);
        await socketUser.usuarioDesconectado(id_oaci)
        io.emit('lista-usuarios', await socketUser.getUserAero())
    });

})

server.listen(3000, '0.0.0.0', () => {




    
    //console.log(color.cyan('desde el puerto 3000'))
})