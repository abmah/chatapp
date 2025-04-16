import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './services/chat.service';
import { Message } from './interfaces/message.interface';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private chatService: ChatService) {}

  @SubscribeMessage('join')
  handleJoin(
    @MessageBody() data: { username: string },
    @ConnectedSocket() client: Socket,
  ) {
    const user = this.chatService.addUser(data.username, client.id);

    this.server.emit('userJoined', { username: user.username });

    return { status: 'ok' };
  }

  @SubscribeMessage('chatMessage')
  handleMessage(
    @MessageBody() message: Message,
    @ConnectedSocket() client: Socket,
  ) {
    const validation = this.chatService.validateMessage(message);

    if (!validation.isValid) {
      client.emit('error', { message: validation.error });
      return;
    }

    const enhancedMessage = {
      ...message,
      timestamp: new Date(),
    };

    this.server.emit('message', enhancedMessage);

    return { status: 'ok' };
  }

  handleDisconnect(client: Socket) {
    const user = this.chatService.removeUser(client.id);
    if (user) {
      this.server.emit('userLeft', { username: user.username });
    }
  }
}
