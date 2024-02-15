const express = require('express');
const mongoose = require('mongoose');

const app = express();

const port = 5000;


app.listen(port, ()=>{
    console.log("server is running")
})