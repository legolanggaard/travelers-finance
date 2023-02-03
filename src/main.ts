import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import process from 'process';

async function bootstrap() {
  const basicApiApp = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3100;
  await basicApiApp.listen(port);

  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [
        `amqps://${process.env.CONSUMER_USERNAME}:${process.env.CONSUMER_PASSWORD}@b-902ad621-f4ca-4d73-88e5-42bb5540f386.mq.eu-west-1.amazonaws.com:5671`,
      ],
      queue: 'rabbit-mq-nest-js',
      // false = manual acknowledgement; true = automatic acknowledgment
      noAck: false,
      // Get one by one
      prefetchCount: 1,
    },
  });
  await app.listen();
}
bootstrap().then();