const EmailRequest = require('../models/emailRequest');
const { getChannel } = require('../utils/mq');

exports.handleHook = async (req, res) =>{

    const { to, subject, body} = req.body;

    if(!to || !subject || !body){
        return res.status(400).send('Invalid Payload');
    }

    const emailRequest = new EmailRequest({ to, subject, body});


    try {

        //1. Save to DB asynchronously
        await emailRequest.save();

        //2. Send message to RabbitMQ
        const channel = getChannel();
        channel.sendToQueue('emailQueue', Buffer.from(JSON.stringify(emailRequest)), {persistent: true});

        //3. Respond immediately without message
        res.status(202).send();


    } catch (error) {
        console.error('Error processing request', error);
        res.status(500).send('Internal Server Error');
    }
}