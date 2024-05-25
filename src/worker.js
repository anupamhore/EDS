const mongoose = require('mongoose');
const { connectMQ, getChannel } = require('./utils/mq');
const { sendEmail } = require('./services/emailService');
const EmailRequest = require('./models/emailRequest');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
    useNewURLParser: true, 
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch( error => console.error('Failed to connect to MongoDB:', error));

connectMQ().then( ()=>{
    const channel = getChannel();
    channel.consume('emailQueue', async (msg) =>{
        if(msg !== null){
            const emailRequest = JSON.parse(msg.content.toString());
            await sendEmail(emailRequest);
            channel.ack(msg);
        }
    });
});