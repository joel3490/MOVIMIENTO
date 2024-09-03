import { Request, Response } from 'express';
import Mov from '../models/Mov.model';

export const getMov = async(req : Request, res: Response)=> {
    try {
        const mov = await Mov.findAll({
            attributes:[
            'id', 'fecha', 'idAvion', 'modelo', 'propietario',
            'procedencia', 'destino',  'horaDespegue', 'horaArribo',
            'ruta', 'nroVuelo', 'obs', 'idControlador', 'nivel',
            'eobt',  'destProcedencia', 'pistaProcedencia', 'calleProcedencia',
            'destArribo', 'pistaArribo', 'calleArribo', 'estado'
            ],
            
            order: [['id', 'DESC']],
            limit: 100
        });
        res.json({data:mov})
       
    } catch (error) {
        console.error('no hay registros:', error);
        
    }
}







export const getMovById = async(req : Request, res: Response)=> {
    try {
        const {id} = req.params
        const mov = await Mov.findByPk(id,{
            attributes:[
            'id', 'fecha', 'idAvion', 'modelo', 'propietario',
            'procedencia', 'destino',  'horaDespegue', 'horaArribo',
            'ruta', 'nroVuelo', 'obs', 'idControlador', 'nivel',
            'eobt',  'destProcedencia', 'pistaProcedencia', 'calleProcedencia',
            'destArribo', 'pistaArribo', 'calleArribo', 'estado'
            ],
            
        })
        if(!mov){
            return res.status(400).json({
                error: 'movimiento no encontrado'
            })
        }
        res.json({data:mov})
       
    } catch (error) {
        console.error('no hay registros:', error);
        
    }
}


export const createMov = async (req: Request, res: Response) => {
    try {
        const {
            
            fecha, idAvion, modelo, propietario,
            procedencia,  destino, horaDespegue, horaArribo,
            ruta, nroVuelo, obs, idControlador,
            nivel, eobt, destProcedencia, pistaProcedencia,
            calleProcedencia, destArribo, pistaArribo,
            calleArribo, estado
        } = req.body;
        
        const mov = await Mov.create({
            
            fecha, idAvion, modelo, propietario,
            procedencia,  destino, horaDespegue, horaArribo,
            ruta, nroVuelo, obs, idControlador,
            nivel, eobt, destProcedencia, pistaProcedencia,
            calleProcedencia, destArribo, pistaArribo,
            calleArribo, estado
        });

        res.status(201).json({ id: mov.id });
       // console.log (mov.id)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: `Error creating movement: ${error.message}` });
    }
}