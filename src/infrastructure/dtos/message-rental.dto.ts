import { MessageModel } from '../../core/models/message.model';
import { MessageRentalModel } from '../../core/models/message-rental.model';

export interface MessageRentalDto {
  id: string;
  message: string;
  orderId: string;
}

export const convertMessageDtoToModel = (
  dto: MessageRentalDto,
): MessageRentalModel => {
  return { id: dto.id, message: dto.message, orderId: dto.orderId };
};

export const convertMessageModelToDto = (
  model: MessageRentalModel,
): MessageRentalDto => {
  return { id: model.id, message: model.message, orderId: model.orderId };
};
