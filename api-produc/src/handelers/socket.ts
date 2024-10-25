import aeroUser from "../models/aeroUser.model"


export class socketUser {

    static usuarioConectado = async (id_oaci) => {

        const conectarUser = await aeroUser.findOne({
            where: { id_oaci }
        });
        if (conectarUser) {
            conectarUser.online = true;
            await conectarUser.save();
        } else {
            console.log(`Usuario con id_oaci ${id_oaci} no encontrado`);
        }

        return this.usuarioConectado
    }

    static usuarioDesconectado = async (id_oaci) => {

        const desconectarUser = await aeroUser.findOne({
            where: { id_oaci }
        });
        if (desconectarUser) {
            desconectarUser.online = false; // Cambia el estado a "offline"
            await desconectarUser.save();   // Guarda los cambios en la base de datos
        } else {
            console.log(`Usuario con id_oaci ${id_oaci} no encontrado`);
        }

        return this.usuarioDesconectado
    }

    static getUserAero = async ()=>{
        const usuarios = await aeroUser.findAll({           
            order:[ ['online', 'DESC'] ]            
        })
        return usuarios
    }



}