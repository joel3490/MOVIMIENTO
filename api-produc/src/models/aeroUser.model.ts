
import {Table, Column, Model, DataType} from 'sequelize-typescript'

@Table({
    tableName: 'aeroUser',
    timestamps: true,
    indexes: [{ unique: true, fields: ['id_oaci'] }] 
}) 

class aeroUser extends Model{
    
    @Column({
        type: DataType.STRING(),
        allowNull: false,
        unique: true
    })
    declare id_oaci: String 

    @Column({
        type: DataType.STRING(),
        allowNull: false,
    })
    declare password: String 
    
    @Column({
        type: DataType.STRING(),
        allowNull: false,
    })
    declare aeropuerto: String    

    @Column({
        type: DataType.STRING(),
        allowNull: false,
    })
    declare nombre: String

    @Column({
        type: DataType.STRING(),
        allowNull: false,
    })
    declare regional: String

          
}

export default aeroUser