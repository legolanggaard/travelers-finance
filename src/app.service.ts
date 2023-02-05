import { Injectable } from '@nestjs/common';
import { MessageModel } from './core/models/message.model';
import { RabbitMQService } from './infrastructure/rabbit-mq/rabbit-mq.service';
import { MessageRentalDto } from './infrastructure/dtos/message-rental.dto';

@Injectable()
export class AppService {
  constructor(private readonly rabbitMQService: RabbitMQService) {}

  getHello(): string {
    return 'Hello Finance!';
  }

  orderAndInform(model: MessageModel): string {
    //Save, do stuff and be happy
    const rentalMessage: MessageRentalDto = {
      orderId: model.id,
      message: model.message,
      id: `rental:${model.id}`,
    };
    try {
      this.rabbitMQService
        .send('rabbit-mq-producer', rentalMessage)
        .toPromise()
        .catch((e) => {
          console.log('e', e);
        });
      return 'Message sent to the rabbit-mq-nest-js queue!';
    } catch (e) {
      return `Something bad happened: ${e}`;
    }
  }
}
