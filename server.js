const express = require('express');
const app = express();
require('dotenv').config();
const db = require('./db')

const bodyParser = require('body-parser');


app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

const userRoutes = require('./routes/userRoutes');
const candidateRoutes = require('./routes/candidateRoutes')

app.use('/user', userRoutes);

// //Add the login route
// const loginRoutes = require()
app.use('/login', userRoutes)
app.use('/profile', userRoutes);

app.use('/', candidateRoutes)

app.listen(PORT, ()=>{
    console.log(`App started listening at PORT ${PORT}`)
});