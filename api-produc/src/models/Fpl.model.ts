import { DateOnlyDataType } from 'sequelize'
import {Table, Column, Model, DataType, Default} from 'sequelize-typescript'

@Table({
    tableName: 'fpls',
    timestamps: true,
}) 

class Fpl extends Model{
    @Column({
        type: DataType.DATEONLY(),
        allowNull: false,
    })
    declare created_at: DateOnlyDataType

    @Column({
        type: DataType.DATEONLY(),
        allowNull: false,
    })
    declare updated_at: DateOnlyDataType
    
    @Column({
        type: DataType.INTEGER(),
        allowNull: false,
    })
    declare id_amhs: String

    @Column({
        type: DataType.DATEONLY(),
        allowNull: false,
    })
    declare fechaHora: DateOnlyDataType

    @Column({
        type: DataType.STRING(),
        allowNull: false,
    })
    declare cabecera: String

    @Column({
        type: DataType.STRING(),
        allowNull: false,
    })
    declare mensaje: String

    @Column({
        type: DataType.STRING(),
        allowNull: false,
    })
    declare c1: String

    @Column({
        type: DataType.STRING(),
        allowNull: false,
    })
    declare c2: String

    @Column({
        type: DataType.STRING(),
        allowNull: false,
    })
    declare c3: String

    @Column({
        type: DataType.STRING(),
        allowNull: false,
    })
    declare c4: String

    @Column({
        type: DataType.STRING(),
        allowNull: false,
    })
    declare c5: String

    @Column({
        type: DataType.STRING(),
        allowNull: false,
    })
    declare c6: String

    @Column({
        type: DataType.STRING(),
        allowNull: false,
    })
    declare c7: String

    @Column({
        type: DataType.STRING(),
        allowNull: false,
    })
    declare c8: String

    @Column({
        type: DataType.STRING(),
        allowNull: false,
    })
    declare tipoMensaje: String

    
}

export default Fpl