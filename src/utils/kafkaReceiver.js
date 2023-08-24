const { Kafka } = require('kafkajs');
// import { Kafka } from 'kafkajs'

const kafka = new Kafka({
  clientId: 'your-app',
  brokers: ['localhost:9092']
});

const consumer = kafka.consumer({ groupId: '0' });

const receiveMesssage = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'secondTopic', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ partition = 1, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString()
      });
    }
  });
  // consumer.stop();
};

receiveMesssage().catch(console.error);

// const kafka = require('kafka-node');
// const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });

// const Consumer = kafka.Consumer;

// export const receiveMesssage = () => {
//   const consumer = new Consumer(
//     client,
//     [{ topic: 'secondTopic', partition: 0 }],
//     {
//       autoCommit: true, // Auto commit offsets
//       autoCommitIntervalMs: 1000
//     }
//   );
//   consumer.on('message', (message) => {
//     console.log('Received message:', message.value);
//     // console.log(message.value);
//   });

//   consumer.on('error', (err) => {
//     console.error('Consumer error:', err);
//   });
// };
// // receiveMesssage();
