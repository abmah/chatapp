import { BaseMessage } from './base-message.model';

export class SystemMessage extends BaseMessage {
  format(): string {
    return `[${this.timestamp.toLocaleTimeString()}] System: ${this.text}`;
  }
}
