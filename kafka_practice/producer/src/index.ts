import express from 'express';
import { Kafka } from 'kafkajs';

const app = express();
const port = 3001;

// Middleware to parse JSON
app.use(express.json());

// Kafka setup
const kafka = new Kafka({
  clientId: 'producer-app',
  brokers: ['localhost:9092'],
});

const producer = kafka.producer();

const startProducer = async () => {
  await producer.connect();
  console.log('Kafka Producer connected');
};

startProducer().catch(console.error);

// API to send messages to Kafka
app.post('/send', async (req, res) => {
  const { topic, message } = req.body;

  try {
    await producer.send({
      topic: topic || 'test-topic', // Default topic
      messages: [{ value: message }],
    });
    res.status(200).send({ status: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).send({ status: 'Error sending message', error });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Producer service running on http://localhost:${port}`);
});
