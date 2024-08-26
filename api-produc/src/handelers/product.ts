// desde la carperta de handlers
import {Request, Response} from 'express'// para auto completado de res y req
import Product from '../models/Product.model'


export const createProduct = async(req: Request, res: Response)=>{
    try {
        const product = await Product.create(req.body)    
        res.json({data:product})        
    } catch (error) {
        console.log(error)
    }
}

export const getProduct= async(req: Request, res: Response)=>{

    try {
        const products = await Product.findAll({
            order:[ ['id', 'DESC'] ],
            attributes: {exclude:['createdAt', 'updatedAt']} 
            //limit: 2
        })
            
        res.json({data: products})        
    } catch (error) {
        console.log(error)
    }

}

export const getProductById= async(req: Request, res: Response)=>{
    try {
        
        //console.log(req.params.id)// te muestra en consola el id registrado en el url
        const {id} = req.params
        const product = await Product.findByPk(id)
        if(!product){
            return res.status(404).json({
                error: 'producto no encontrado'
            })
        }
        res.json({data: product})
        
    } catch (error) {
        
    }
}

export const updateProduct = async (req: Request, res: Response)=>{
    const {id} = req.params
    const product = await Product.findByPk(id)
    if(!product){
        return res.status(404).json({
            error: 'producto no encontrado'
        })
    }
    // actualizar
    //console.log(req.body)
    await product.update(req.body)
    await product.save()
    res.json({data: product})
}

export const updatePachProduct = async (req: Request, res: Response)=>{
    const {id} = req.params
    const product = await Product.findByPk(id)
    if(!product){
        return res.status(404).json({
            error: 'producto no encontrado'
        })
    }
    // actualizar
    //console.log(req.body)
    await product.update(req.body)
    await product.save()
    res.json({data: product})
}

export const deleteProduct= async(req, res)=>{
    const {id} = req.params
    const product = await Product.findByPk(id)
    if(!product){
        return res.status(404).json({
            error: 'producto no encontrado'
        })
    }
    
    await product.destroy()
    res.json({data: product})
} 