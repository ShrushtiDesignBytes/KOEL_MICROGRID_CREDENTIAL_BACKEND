
const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require("dotenv").config()

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  pool: { max: 20, min: 0, idle: 10000 },
  dialectOptions: {
    ssl: {
      require: true, // This will enable SSL connection
      rejectUnauthorized: false // This will bypass any SSL validation issues
    }
  },
  logging: false
});


const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.role = require('../src/role/role_models')(sequelize,DataTypes);
db.sites = require('../src/site/site_models')(sequelize, DataTypes);
db.user = require('../src/user/user_models')(sequelize,DataTypes);
db.assignSite = require('../src/assignSite/assignSite_models')(sequelize, DataTypes);


db.assignSite.belongsTo(db.user, {foreignKey: 'userId'});
db.user.hasMany(db.assignSite, {foreignKey: 'userId'});

db.user.belongsTo(db.role, {foreignKey: 'roleId'});
db.role.hasMany(db.user, {foreignKey: 'roleId'});

db.user.belongsToMany(db.sites, { through: 'user_sites', foreignKey: 'userId' });
db.sites.belongsToMany(db.user, { through: 'user_sites', foreignKey: 'siteId' });

db.sequelize.sync({force: false})
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

module.exports = db;

//let db = mysql.createConnection({
//  host: 'localhost',
//  user: 'root',
//  password: 'sonu',
//  database: 'test',
//});