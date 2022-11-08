import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  messages: string[] = [];
  constructor() {}

  addMessage = (message: string): void => {
    this.messages.push(message);
    setTimeout(() => {
      this.clearMessages();
    }, 3000);
  };

  getMessages = (): Observable<string[]> => {
    return of(this.messages);
  };

  clearMessages = () => {
    this.messages = [];
  };

  close = (message: string) => {
    this.messages = this.messages.filter((m) => m !== message);
  };
}
