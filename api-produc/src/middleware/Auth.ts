import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import aeroUser from '../models/aeroUser.model';

declare global{
  namespace Express{
    interface Request{
      aerouser?: aeroUser
    }
  }
}

export const autorizacion = async (req: Request, res: Response, next: NextFunction) => {
  //console.log(req.headers.authorization)

  const bearer = req.headers.authorization
  if(!bearer){
    const error = new Error('No Autorizado')
    
    return res.status(401).json({error: error.message})
  }
  //console.log(bearer)

  const token = bearer.split(' ')[1]
  //console.log(token)

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
   // console.log(decoded)

    if (typeof decoded === 'object' && decoded.id_oaci) {
      const aerouser = await aeroUser.findOne({
        where: { id_oaci: decoded.id_oaci },
        attributes: ['id_oaci','aeropuerto', 'nombre', 'regional']
      }) 
        
        if (aerouser) {
          req.aerouser = aerouser
          next()
        } else {
          res.status(500).json({error: 'Token no Valido'})          
        }
      //console.log(req.aerouser.nombre)
    }
  } catch (error) {
    res.status(500).json({error: 'Token no Valido'})
  }

  
}