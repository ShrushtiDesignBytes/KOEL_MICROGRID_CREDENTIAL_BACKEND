const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require("./config/db.js");
const dotenv = require('dotenv').config()


const roleRoutes = require('./src/role/role_routes.js');
const siteRoutes = require('./src/site/site_routes.js');
const userRoutes = require('./src/user/user_routes.js');
const assignRoutes = require('./src/assignSite/assignSite_routes.js');

const app = express();
const PORT = 5002 || process.env.PORT;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors())

app.use('/role', roleRoutes);
app.use('/site', siteRoutes);
app.use('/', userRoutes);
app.use('/assignRoutes', assignRoutes);

app.get('/', (req,res) => res.send('Hello User'));

app.listen(PORT, () => console.log(`Server Running on port: http://localhost:${PORT}`));