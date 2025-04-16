import { Message } from './message.interface';

export interface MessageSender {
  sendMessage(message: Message): void;
}
