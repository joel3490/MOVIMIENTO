import { Request, Response } from "express"
import bcrypt from 'bcrypt'
import aeroUser from "../models/aeroUser.model"


import jwt from 'jsonwebtoken'



export class auth {

    static login = async (req: Request, res: Response) => {
        try {            
            const {id_oaci, password} = req.body
            console.log('Datos recibidos:', { id_oaci })
            const user = await aeroUser.findOne({ 
                where: { id_oaci } ,
                attributes: ['id_oaci', 'password'],                
              })
              
            if (!user) {
                const error = new Error('Usuario no encontrado')
                return res.status(404).json({error: error.message})
            }
            //res.status(200).json({ message: 'Usuario encontrado' })
           // console.log(user)
           const verificar = await bcrypt.compare(password, user.password.toString())
            //console.log(verificar)
           if (!verificar) {
               return res.status(401).json({ error: 'Contraseña incorrecta' })
           }           
           
           
           
           const token = jwt.sign(
            { id_oaci: user.id_oaci },  
            process.env.JWT_SECRET as string,                      
            { expiresIn: '180d' }                         
            );
            res.send(token)
            console.log(token)           
           //return res.status(200).json({ message: 'Login exitoso' })  
        }
        catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Error al crear el usuario' })
        }
    }


    static createAccount = async (req: Request, res: Response) => {
        try {
            const { password } = req.body
            const User = new aeroUser(req.body)

            const generar = await bcrypt.genSalt(10)
            User.password = await bcrypt.hash(password, generar)

            await User.save()
            res.status(201).json({ message: 'Usuario creado exitosamente' })
        }
        catch (error: any) {
            if (error.name === 'SequelizeUniqueConstraintError') {

                res.status(400).json({ error: 'El id_oaci ya está en uso' });
            } else {
                console.error(error);
                res.status(500).json({ error: 'Error al crear el usuario' });
            }
        }
    }

    
}