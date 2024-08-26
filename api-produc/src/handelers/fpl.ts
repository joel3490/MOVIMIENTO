// desde la carperta de handlers
import {Request, Response} from 'express'// para auto completado de res y req
import Fpl from '../models/Fpl.model'
import { Op } from 'sequelize';


export const searchFpl = async (req: Request, res: Response) => {
    try {
        const { fplBuscar } = req.query;

        if (!fplBuscar || typeof fplBuscar !== 'string') {
            return res.status(400).json({ error: 'El parámetro searchTerm es requerido y debe ser una cadena.' });
        }

        const fpls = await Fpl.findAll({
            where: {
                [Op.or]: [
                    { c1: { [Op.iLike]: `%${fplBuscar}%` } },
                    { c8: { [Op.iLike]: `%${fplBuscar}%` } }
                ]
            },
            attributes: [
                'id', 'created_at', 'updated_at', 'id_amhs', 'fechaHora', 'cabecera', 
                'mensaje', 'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 
                'tipoMensaje', 'ca_tipo', 'ca_idUsu', 'ca_estado'
            ],
            order: [['id', 'DESC']],
            limit: 200
        });

        res.json({ data: fpls });
    } catch (error) {
        console.log('Error en la búsqueda:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}



export const getFpl= async(req: Request, res: Response)=>{
    try {
        const fpl = await Fpl.findAll({
            attributes: [
                'id', 'created_at', 'updated_at', 'id_amhs', 'fechaHora', 'cabecera', 
                'mensaje', 'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 
                'tipoMensaje', 'ca_tipo', 'ca_idUsu', 'ca_estado'
              ],
            order:[ ['id', 'DESC'] ],
            limit: 5000
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
            attributes: [
                'id', 'created_at', 'updated_at', 'id_amhs', 'fechaHora', 'cabecera',
                'mensaje', 'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8',
                'tipoMensaje', 'ca_tipo', 'ca_idUsu', 'ca_estado'
            ]
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