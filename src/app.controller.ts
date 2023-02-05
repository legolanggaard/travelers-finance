import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import {
  convertMessageDtoToModel,
  MessageDto,
} from './infrastructure/dtos/message.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern({ cmd: 'shoppingCart' })
  public async execute(@Payload() dto: MessageDto, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    channel.ack(context.getMessage());
    console.log('shopping cart dto received', dto);
    const messageModel = convertMessageDtoToModel(dto);
    console.log('converted to model and resending', messageModel);
    //Do stuff with model? and send more to another queue?
    return this.appService.orderAndInform(messageModel);
  }
}
