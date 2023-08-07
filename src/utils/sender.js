#!/usr/bin/env node
//RabbitMQ is based on Advanced Message Queuing Protocol (AMQP)
var amqp = require('amqplib/callback_api');
export const send = (message) => {
  amqp.connect('amqp://localhost', function (error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }

      var queue = 'queue2';
      var msg = message;

      channel.assertQueue(queue, {
        durable: false
      });
      channel.sendToQueue(queue, Buffer.from(msg));

      console.log(' [x] Sent: %s', msg);
    });
  });
};
