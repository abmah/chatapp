import { BaseMessage } from './base-message.model';

export class ChatMessage extends BaseMessage {
  format(): string {
    return `[${this.timestamp.toLocaleTimeString()}] ${this.username}: ${this.text}`;
  }
}
