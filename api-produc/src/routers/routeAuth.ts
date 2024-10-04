import { Router } from "express";
import { auth } from "../handelers/authController";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware";
import { autorizacion } from "../middleware/Auth";
const router = Router()


router.post('/create-account',
    autorizacion,
    
    body('id_oaci').notEmpty().withMessage('el aeroùertp no debe ser vacio'),
    body('password').isLength({min:4}).withMessage('la contraseña debe ser 4 caracteres'),
    body('password_confirmation').custom((value, {req})=>{
        if(value !== req.body.password){
            throw new Error('no son iguales')
        }
        return true
    }),
    body('aeropuerto'),
    body('nombre'),
    body('regional'),

    handleInputErrors,
    
    auth.createAccount
 )

 router.post('/login',
    body('id_oaci').notEmpty().withMessage('el aeropuert no debe ser vacio'),
    body('password').notEmpty().withMessage('la contraseña no debe ser vacio'),  
    handleInputErrors,
    auth.login
 )


 router.get('/aerouser',
    autorizacion,
    auth.aerouser
 )



export default router