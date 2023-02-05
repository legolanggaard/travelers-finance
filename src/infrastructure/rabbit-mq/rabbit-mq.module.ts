import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMQService } from './rabbit-mq.service';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'rabbit-mq-module',
        transport: Transport.RMQ,
        options: {
          urls: [
            `amqps://${process.env.CONSUMER_USERNAME}:${process.env.CONSUMER_PASSWORD}@b-902ad621-f4ca-4d73-88e5-42bb5540f386.mq.eu-west-1.amazonaws.com:5671`,
          ],
          queue: 'rentals',
        },
      },
    ]),
  ],
  controllers: [],
  providers: [RabbitMQService],
  exports: [RabbitMQService],
})
export class RabbitMQModule {}
