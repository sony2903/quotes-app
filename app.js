const express = require('express')
const app = express()
const router = require('./router')
require('dotenv').config()
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true}))

app.use('/', router)

app.listen(PORT, () => {
    console.log(`=====================================`);    
    console.log(`App running on PORT : ${PORT}`);    
    console.log(`=====================================`);  
})