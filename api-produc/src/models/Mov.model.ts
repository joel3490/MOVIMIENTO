import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table({
    tableName: 'movs',
    timestamps: true
})
class Mov extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        allowNull: false,        
    })
    declare id: number;

    @Column({
        type: DataType.DATEONLY,
        allowNull: false,
    })
    declare fecha: Date;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare idAvion: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare modelo: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare propietario: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare procedencia: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare destino: string;

    @Column({
        type: DataType.TIME,
        allowNull: true,
    })
    declare horaDespegue?: Date;

    @Column({
        type: DataType.TIME,
        allowNull: true,
    })
    declare horaArribo?: Date;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    declare ruta?: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    declare nroVuelo?: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    declare obsProcedencia: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare idControladorPro: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    declare obsArribo: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    declare idControladorArr: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare nivel: number;

    @Column({
        type: DataType.TIME,
        allowNull: true,
    })
    declare eobt: Date;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare destProcedencia: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare pistaProcedencia: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare calleProcedencia: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare destArribo: string;

    @Column({
        type: DataType.STRING,
        allowNull: true, // Permitir valores nulos
    })
    declare pistaArribo: string ;
    
    @Column({
        type: DataType.STRING,
        allowNull: true, // Permitir valores nulos
    })
    declare calleArribo: string;

    @Column({
        type: DataType.STRING,
        allowNull: true, // Permitir valores nulos
    })
    declare alterno: string;

   

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    declare estado: number;
    
    }

export default Mov;