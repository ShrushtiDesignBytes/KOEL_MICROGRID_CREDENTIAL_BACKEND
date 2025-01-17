
module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define("role", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
       role: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },  
    },
        {
            freezeTableName: true,
            timestamps: false       });   
            
            
            return Role

}