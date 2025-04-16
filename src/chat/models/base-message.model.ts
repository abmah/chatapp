export abstract class BaseMessage {
  username: string;
  text: string;
  timestamp: Date;

  constructor(username: string, text: string) {
    this.username = username;
    this.text = text;
    this.timestamp = new Date();
  }

  abstract format(): string;
}
