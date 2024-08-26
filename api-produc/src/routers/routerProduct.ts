import {Router} from 'express'
import { createProduct, deleteProduct, getProduct, getProductById, updatePachProduct, updateProduct } from '../handelers/product'
import {body, param} from 'express-validator'
import { handleInputErrors } from '../middleware'

const router = Router()

router.get('/', getProduct)
router.get('/:id', 
    param('id').isInt().withMessage('id no valido'),
    handleInputErrors,
    getProductById
)

router.post('/',
    body('name')
                        .notEmpty()
                        .withMessage('el nombre no debe ser campo vacio'),
    body('price')
                        .isNumeric().withMessage('el valor insertado debe ser numerico')   
                        .notEmpty().withMessage('el nombre no debe ser campo vacio')
                        .custom(value => value > 0).withMessage('precio no valido'),
    handleInputErrors, 
    createProduct
)

router.put('/:id', 
   // param('id').isInt().withMessage('id no valido'),
   body('name')
                        .notEmpty()
                        .withMessage('el nombre no debe ser campo vacio'),
    body('price')
                        .isNumeric().withMessage('el valor insertado debe ser numerico')   
                        .notEmpty().withMessage('el nombre no debe ser campo vacio')
                        .custom(value => value > 0).withMessage('precio no valido'),
    body('existe')      .isBoolean().withMessage('valor para disponibilidad ni valido'),
    handleInputErrors,
    updateProduct
)

router.patch('/',(req, res)=>{
    param('id').isInt().withMessage('id no valido'),
    handleInputErrors,
    updatePachProduct

})



router.delete('/:id', 
    param('id').isInt().withMessage('id no valido'),
    handleInputErrors,
    deleteProduct)





router.get('/')

router.get('/:id')
export default router
