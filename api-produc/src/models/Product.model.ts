import {Table, Column, Model, DataType, Default} from 'sequelize-typescript'

@Table({
    tableName: 'products',
    timestamps: true,
}) 

class Product extends Model{
    @Column({
        type: DataType.STRING(),
        allowNull: false,
    })
    declare name: String

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    declare price: Number

    
    @Default(true)
    @Column({
        type: DataType.BOOLEAN
    })
    declare existe: Boolean
}

export default Product