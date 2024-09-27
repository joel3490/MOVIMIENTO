import express from 'express'
import cors, { CorsOptions } from 'cors'
import routerProduct from './routers/routerProduct'
import routeFpl from './routers/routeFpl'
import routeMov from './routers/routeMov'
import routeAuth from './routers/routeAuth'
import db from './config/db'
import color from 'colours'
import morgan from 'morgan'


 //conectar a la base de datos
 async function connectionDB(){
    try {
        await db.authenticate()
        //este codigo realiza la creacion de la tabla si no exiaste en al base de datos
        db.sync()
        console.log(color.cyan('se conecto satisfactoriamente'))
    } catch (error) {
        console.log(error)
        console.log(color.red('nose conecto a la base de datos'))
    }
 }

 connectionDB() //con estp se utiliza para usar esa funcion de coneccion de la base de datos
//INSTANCIA DE EXPRESS
 const serverMov = express()

 //permitir conexiones 
 const corsOptions : CorsOptions = {
   origin: "*"
    //origin: function(origin, callback){
        
        //if(origin === process.env.FRONTEND_URL){callback(null, true)}
        //else{callback(new Error('eror de cors'))}
        //console.log('permiitir')
    //}
 }
 serverMov.use(cors(corsOptions))

 //LEER DATOS DE FORMUALARIO
 serverMov.use(express.json())

 serverMov.use(morgan('dev'))


//es como la url padre 
serverMov.use('/api/products', routerProduct)
serverMov.use('/fpl', routeFpl)
serverMov.use('/mov', routeMov)
serverMov.use('/auth', routeAuth)



export default serverMov
