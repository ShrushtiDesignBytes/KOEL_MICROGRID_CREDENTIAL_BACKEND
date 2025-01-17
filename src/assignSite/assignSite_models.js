
module.exports = (sequelize, DataTypes) => {
    const AssignSites = sequelize.define("assignSites", {
        overview: {
            type: DataTypes.BOOLEAN,
        }, 
        solar: {
            type: DataTypes.BOOLEAN,
        }, 
        wind: {
            type: DataTypes.BOOLEAN,
        }, 
        genset: {
            type: DataTypes.BOOLEAN,
        }, 
        ess: {
            type: DataTypes.BOOLEAN,
        }, 
        mains: {
            type: DataTypes.BOOLEAN,
        }, 
        biogas: {
            type: DataTypes.BOOLEAN,
        }, 
        alert: {
            type: DataTypes.BOOLEAN,
        }, 
    },
        {
            freezeTableName: true,
            timestamps: false       });   
            
            
            return AssignSites

}