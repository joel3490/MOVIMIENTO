import {Router} from 'express'
import {body, param} from 'express-validator'
import { handleInputErrors } from '../middleware'
import { createMov, getMov, getMovById, updateMov } from '../handelers/mov'

const router = Router()

router.post('/crearMov',
    body('fecha').notEmpty().withMessage('el nombre no debe ser campo vacio'),
    body('idAvion').notEmpty().withMessage('el nombre no debe ser campo vacio'),
    body('modelo').notEmpty().withMessage('el nombre no debe ser campo vacio'),
    body('propietario').notEmpty().withMessage('el nombre no debe ser campo vacio'),
    body('procedencia').notEmpty().withMessage('el nombre no debe ser campo vacio'),
    body('destino').notEmpty().withMessage('el nombre no debe ser campo vacio'),
    body('horaDespegue'),//.custom(isTimeFormatValid).withMessage('formato de hora no valido').notEmpty().withMessage('el nombre no debe ser campo vacio'),
    body('horaArribo'),//.custom(isTimeFormatValid).withMessage('formato de hora no valido').notEmpty().withMessage('el nombre no debe ser campo vacio'),
    body('ruta').notEmpty().withMessage('el nombre no debe ser campo vacio'),
    body('nroVuelo').notEmpty().withMessage('el nombre no debe ser campo vacio'),
    body('obsProcedencia'),//.notEmpty().withMessage('el nombre no debe ser campo vacio'),
    body('idControladorPro').notEmpty().withMessage('el nombre no debe ser campo vacio'),
    body('obsArribo'),//.notEmpty().withMessage('el nombre no debe ser campo vacio'),
    body('idControladorArr'),//.notEmpty().withMessage('el nombre no debe ser campo vacio'),
    body('nivel').notEmpty().withMessage('el nivel no debe ser campo vacio'),
    body('eobt'),//.notEmpty().withMessage('el eobt no debe ser campo vacio'),
    body('destProcedencia'),
    body('pistaProcedencia'),//.notEmpty().withMessage('el nombre no debe ser campo vacio'),
    body('calleProcedencia'),//.notEmpty().withMessage('el nombre no debe ser campo vacio'),
    body('destArribo'),
    body('calleArribo').optional(),
    body('pistaArribo').optional(),
    body('estado').optional(),
    handleInputErrors, 
    createMov
);

router.get('/', getMov)

router.put('/:id', updateMov)

router.get('/:id', 
  param('id').isInt().withMessage('id no valido'),
  handleInputErrors,
  getMovById  
)
export default router