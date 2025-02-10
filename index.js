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

const allowedOrigins = [
    'https://koelsmartenergy.com/', // Production frontend
    'https://www.koelsmartenergy.com'
  ];
  
  const corsOptions = {
    origin: (origin, callback) => {
      //console.log('Request Origin:', origin); // Debugging
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Allow cookies/auth headers if needed
  };
  

app.use(cors(corsOptions))

app.use('/role', roleRoutes);
app.use('/site', siteRoutes);
app.use('/', userRoutes);
app.use('/assignRoutes', assignRoutes);

app.get('/', (req,res) => res.send('Hello User'));

app.listen(PORT, () => console.log(`Server Running on port: http://localhost:${PORT}`));