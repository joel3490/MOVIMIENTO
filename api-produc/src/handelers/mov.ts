import { Request, Response } from 'express';
import Mov from '../models/Mov.model';

export const getMov = async (req: Request, res: Response) => {
    try {
        const mov = await Mov.findAll({
            attributes: [
                'id', 'fecha', 'idAvion', 'modelo', 'propietario',
                'procedencia', 'destino', 'horaDespegue', 'horaArribo',
                'ruta', 'nroVuelo', 'obsProcedencia', 'idControladorPro', 'obsArribo', 'idControladorArr', 
                'nivel', 'eobt', 'destProcedencia', 'pistaProcedencia', 'calleProcedencia',
                'destArribo', 'pistaArribo', 'calleArribo', 'estado', 'alterno'
            ],

            order: [['id', 'DESC']],
            limit: 100
        });
        res.json({ data: mov })

    } catch (error) {
        console.error('no hay registros:', error);

    }
}

export const updateMov = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const {
            fecha, idAvion, modelo, propietario,
            procedencia, destino, horaDespegue, horaArribo,
            ruta, nroVuelo, obsProcedencia, idControladorPro, obsArribo, idControladorArr,
            nivel, eobt, destProcedencia, pistaProcedencia,
            calleProcedencia, destArribo, pistaArribo,
            calleArribo, estado, alterno
        } = req.body;

        // Encontrar el registro por su ID
        const mov = await Mov.findByPk(id);
        
        if (!mov) {
            return res.status(404).json({ error: 'Movimiento no encontrado' });
        }

        // Actualizar los campos
        await mov.update({
            fecha, idAvion, modelo, propietario,
            procedencia, destino, horaDespegue, horaArribo,
            ruta, nroVuelo, obsProcedencia, idControladorPro, obsArribo, idControladorArr,
            nivel, eobt, destProcedencia, pistaProcedencia,
            calleProcedencia, destArribo, pistaArribo,
            calleArribo, estado, alterno
        });

        res.json({ message: 'Movimiento actualizado correctamente', data: mov });
    } catch (error) {
        console.error('Error al actualizar el movimiento:', error);
        res.status(500).json({ error: `Error updating movement: ${error.message}` });
    }
}







export const getMovById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const mov = await Mov.findByPk(id, {
            attributes: [
                'id', 'fecha', 'idAvion', 'modelo', 'propietario',
                'procedencia', 'destino', 'horaDespegue', 'horaArribo',
                'ruta', 'nroVuelo', 'obsProcedencia', 'idControladorPro', 'obsArribo', 'idControladorArr', 
                'nivel', 'eobt', 'destProcedencia', 'pistaProcedencia', 'calleProcedencia',
                'destArribo', 'pistaArribo', 'calleArribo', 'estado', 'alterno'
            ],

        })
        if (!mov) {
            return res.status(400).json({
                error: 'movimiento no encontrado'
            })
        }
        res.json({ data: mov })

    } catch (error) {
        console.error('no hay registros:', error);

    }
}


export const createMov = async (req: Request, res: Response) => {
    try {
        const {

            fecha, idAvion, modelo, propietario,
            procedencia, destino, horaDespegue, horaArribo,
            ruta, nroVuelo, obsProcedencia, idControladorPro, obsArribo, idControladorArr,
            nivel, eobt, destProcedencia, pistaProcedencia,
            calleProcedencia, destArribo, pistaArribo,
            calleArribo, estado, alterno
        } = req.body;

        const mov = await Mov.create({

            fecha, idAvion, modelo, propietario,
            procedencia, destino, horaDespegue, horaArribo,
            ruta, nroVuelo, obsProcedencia, idControladorPro, obsArribo, idControladorArr,
            nivel, eobt, destProcedencia, pistaProcedencia,
            calleProcedencia, destArribo, pistaArribo,
            calleArribo, estado, alterno
        });

        res.status(201).json({ id: mov.id });
        //console.log(req.aerouser)
        // console.log (mov.id)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: `Error creating movement: ${error.message}` });
    }
}