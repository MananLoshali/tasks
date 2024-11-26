import express from 'express';
import { Kafka } from 'kafkajs';

const app = express();
const port = 3002;

// Kafka setup
const kafka = new Kafka({
  clientId: 'consumer-app',
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'consumer-group' });

const startConsumer = async () => {
  await consumer.connect();
  console.log('Kafka Consumer connected');
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

  consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`Received message: ${message.value.toString()}`);
    },
  });
};

startConsumer().catch(console.error);

// Start the server
app.listen(port, () => {
  console.log(`Consumer service running on http://localhost:${port}`);
});
