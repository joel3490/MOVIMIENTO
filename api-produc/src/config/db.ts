import {Sequelize} from 'sequelize-typescript'// de cambio de sequelize a sequelize-typescritp
import dotenv from 'dotenv'
import Path from 'path'

dotenv.config()

const db = new Sequelize(
    process.env.DB_DATABASE_ifis as string,
    process.env.DB_USERNAME_ifis as string,
    process.env.DB_PASSWORD_ifis as string,
    {
      host: process.env.DB_HOST_ifis,
      port: Number(process.env.DB_PORT_ifis),
      dialect: 'postgres', // Cambia esto si usas un SGBD diferente
      logging: false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
      //models:[__dirname+'../models/**/*.ts']
      models: [Path.join(__dirname, '../models/**/*.ts')]
      
    }    
);

export default db