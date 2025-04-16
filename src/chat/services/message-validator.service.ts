import { Injectable } from '@nestjs/common';
import { Message } from '../interfaces/message.interface';

@Injectable()
export class MessageValidatorService {
  validate(message: Message): { isValid: boolean; error?: string } {
    if (!message.text.trim()) {
      return { isValid: false, error: 'Message cannot be empty' };
    }

    if (!message.username.trim()) {
      return { isValid: false, error: 'Username cannot be empty' };
    }

    return { isValid: true };
  }
}
