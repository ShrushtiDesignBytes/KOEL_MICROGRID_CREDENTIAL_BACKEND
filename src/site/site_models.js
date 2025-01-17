
module.exports = (sequelize, DataTypes) => {
    const Sites = sequelize.define("sites", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
       siteName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }, 
        siteURL: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },   
    },
        {
            freezeTableName: true,
            timestamps: false       });   
            
            
            return Sites

}