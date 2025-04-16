import { Injectable } from '@nestjs/common';
import { ChatClient } from '../interfaces/chat-client.interface';
import { Message } from '../interfaces/message.interface';
import { MessageValidatorService } from './message-validator.service';
import { UserManager } from '../interfaces/user-manager.interface';

@Injectable()
export class ChatService implements UserManager {
  private users: Map<string, ChatClient> = new Map();

  constructor(private messageValidator: MessageValidatorService) {}

  addUser(username: string, clientId: string): ChatClient {
    const client: ChatClient = { username, id: clientId };
    this.users.set(clientId, client);
    return client;
  }

  removeUser(clientId: string): ChatClient | undefined {
    const user = this.users.get(clientId);
    if (user) {
      this.users.delete(clientId);
    }
    return user;
  }

  getUser(clientId: string): ChatClient | undefined {
    return this.users.get(clientId);
  }

  getAllUsers(): ChatClient[] {
    return Array.from(this.users.values());
  }

  validateMessage(message: Message): { isValid: boolean; error?: string } {
    return this.messageValidator.validate(message);
  }
}
