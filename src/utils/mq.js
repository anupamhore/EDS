const amqp = require('amqplib');

const {RABBITMQ_URI} = process.env;

let channel = null;

const connectMQ = async () =>{
    try {
        const connection = await amqp.connect(RABBITMQ_URI);
        channel = await connection.createChannel();
        await channel.assertQueue('emailQueue', {durable: true});
    } catch (error) {
        console.error('Failed to connect to RabbitMQ', error);
    }
}

const getChannel = () => channel;
module.exports = {connectMQ, getChannel};