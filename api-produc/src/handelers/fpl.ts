import {Request, Response} from 'express'
import Fpl from '../models/Fpl.model'
import { Op } from 'sequelize';


export const searchFpl = async (req: Request, res: Response) => {
    const userId = req.body.id_oaci || req.query.id_oaci;
    
    try {
        const { fplBuscar } = req.query;

        if (!fplBuscar || typeof fplBuscar !== 'string') {
            return res.status(400).json({ error: 'El parámetro searchTerm es requerido y debe ser una cadena.' });
        }

        // Construye la condición de búsqueda
        const whereConditions: any = {
            [Op.or]: [
                { c1: { [Op.iLike]: `%${fplBuscar}%` } },
                { c8: { [Op.iLike]: `%${fplBuscar}%` } }
            ]
        };
        if (userId) {
            whereConditions.c5 = { [Op.like]: `%${userId}%` };
        }

        // Consulta de búsqueda
        const fpls = await Fpl.findAll({
            where: whereConditions,
            attributes: [
                'id', 'id_amhs', 'fechaHora', 'cabecera', 'mensaje', 
                'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 
                'tipoMensaje', 'created_at', 'updated_at'
            ],
            order: [['id', 'DESC']],
            limit: 200
        });

        res.json({ data: fpls });
        console.log('joel', userId);

    } catch (error) {
        console.log('Error en la búsqueda:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}




export const getFpl= async(req: Request, res: Response)=>{
    const userId = req.body.id_oaci || req.query.id_oaci;
    
    try {
        const whereCondition = {
            c5: { [Op.like]: `%${userId}%` }
        };
        const fpl = await Fpl.findAll({
            where: whereCondition,
            attributes: ['id', 'id_amhs', 'fechaHora', 'cabecera', 'mensaje', 
                'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 
                'tipoMensaje', 'created_at', 'updated_at'],
            order:[ ['id', 'DESC'] ],
            limit: 1000
        })            
        res.json({data: fpl})
        //console.log(userId)        
    } catch (error) {
        console.log(error)
    }
}




export const getFplAll= async(req: Request, res: Response)=>{    
    
    try {        
        const fpl = await Fpl.findAll({           
            attributes: ['id', 'id_amhs', 'fechaHora', 'cabecera', 'mensaje', 
                'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 
                'tipoMensaje', 'created_at', 'updated_at'],
            order:[ ['id', 'DESC'] ],
            limit: 1000
        })            
        res.json({data: fpl})               
    } catch (error) {
        console.log(error)
    }
}




export const getFpltById= async(req: Request, res: Response)=>{
    try {
        
        //console.log(req.params.id)// te muestra en consola el id registrado en el url
        const {id} = req.params
        const fpl = await Fpl.findByPk(id, {
            attributes: ['id', 'id_amhs', 'fechaHora', 'cabecera', 'mensaje', 
                'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 
                'tipoMensaje', 'created_at', 'updated_at']
        })
        if(!fpl){
            return res.status(404).json({
                error: 'plan de vuelo no encontrado'
            })
        }
        res.json({data: fpl})
        
    } catch (error) {
        console.log(error)
    }
}