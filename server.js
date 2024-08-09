const express = require('express');
const app = express();
require('dotenv').config();

const bodyParser = require('body-parser');

app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

app.get('/', (req,res)=>{
    res.send("hello moto")
})
app.listen(PORT, ()=>{
    console.log(`App started listening at PORT ${PORT}`)
});