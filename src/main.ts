import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const basicApiApp = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3100;
  await basicApiApp.listen(port);
  const mqUser = process.env.CONSUMER_USERNAME;
  const mqPw = process.env.CONSUMER_PASSWORD;
  const mqUrl = process.env.QUEUE_AWS_URL;
  const mqPort = process.env.QUEUE_AWS_PORT;
  // sd
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [`amqps://${mqUser}:${mqPw}@${mqUrl}:${mqPort}`],
      queue: 'finance',
      // false = manual acknowledgement; true = automatic acknowledgment
      noAck: false,
      // Get one by one
      prefetchCount: 1,
    },
  });
  await app.listen();
}
bootstrap().then();
