const express = require('express');
const mongoose = require('mongoose');
const { connectMQ } = require('./utils/mq');
const hookController = require('./controllers/hookController');
require('dotenv').config();

const app = express();
app.use(express.json());

app.post('/hook', hookController.handleHook);

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, {
    useNewURLParser: true,
    useUnifiedTopology: true
})
.then(()=> {
    console.log('Connected to database');
    return connectMQ();
})
.then( ()=> {
    app.listen(PORT, ()=>{
        console.log(`Server is running on PORT ${PORT}`);
    })
})
.catch( error => console.error('Error starting server: ', error));
