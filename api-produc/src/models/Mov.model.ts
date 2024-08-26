import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table({
    tableName: 'movs',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
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
    declare obs?: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare idControlador: string;

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
        allowNull: true,
    })
    declare estado: string;
    
    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    declare created_at: Date;

    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    declare updated_at: Date;
}

export default Mov;