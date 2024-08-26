import server from "./server";
import color from 'colours'

server.listen(4000, ()=>{
    console.log(color.cyan('desde el puerto 4000'))
})