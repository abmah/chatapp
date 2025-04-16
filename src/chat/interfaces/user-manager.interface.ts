import { ChatClient } from './chat-client.interface';

export interface UserManager {
  addUser(username: string, clientId: string): ChatClient;
  removeUser(clientId: string): ChatClient | undefined;
  getUser(clientId: string): ChatClient | undefined;
}
