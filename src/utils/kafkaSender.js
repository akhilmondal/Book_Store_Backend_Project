const { Kafka } = require('kafkajs');
// import { Kafka } from 'kafkajs'

const kafka = new Kafka({
  clientId: 'your-app',
  brokers: ['localhost:9092']
});

const producer = kafka.producer();

export const sendMessage = async (data) => {
  let msg = JSON.stringify(data);
  // Producing
  await producer.connect();
  await producer.send({
    topic: 'secondTopic',
    messages: [{ value: msg }]
  });
};

// const kafka = require('kafka-node');
// const Producer = kafka.Producer;
// const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
// const producer = new Producer(client);

// export const sendM = (message) => {
//   console.log(message);

//   const sendMessage = (message) => {
//     producer.on('ready', () => {
//       const payloads = [{ topic: 'secondTopic', messages: [message] }];
//       console.log('------------------------------', payloads);
//       producer.send(payloads, (err, data) => {
//         if (err) {
//           console.error('Error sending message:', err);
//         } else {
//           console.log('Message sent:', data);
//         }
//       });
//     });
//     producer.on('error', (err) => {
//       console.error('Producer error:', err);
//     });
//   };

//   sendMessage(message);
// };

// // receiveMesssage();
// // sendMessage('helloooo');
