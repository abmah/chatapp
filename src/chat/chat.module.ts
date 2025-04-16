import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './services/chat.service';
import { MessageValidatorService } from './services/message-validator.service';

@Module({
  providers: [ChatGateway, ChatService, MessageValidatorService],
})
export class ChatModule {}
