import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const basicApiApp = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3100;
  await basicApiApp.listen(port);
  const mqUser = process.env.CONSUMER_USERNAME;
  const mqPw = process.env.CONSUMER_PASSWORD;
  // sd
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [
        `amqps://${mqUser}:${mqPw}@b-902ad621-f4ca-4d73-88e5-42bb5540f386.mq.eu-west-1.amazonaws.com:5671`,
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