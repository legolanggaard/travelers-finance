import { MessageModel } from '../../core/models/message.model';

export interface MessageDto {
  id: string;
  message: string;
}

export const convertMessageDtoToModel = (dto: MessageDto): MessageModel => {
  return { id: dto.id, message: dto.message};
};

export const convertMessageModelToDto = (model: MessageModel): MessageDto => {
  return { id: model.id, message: model.message};
};
