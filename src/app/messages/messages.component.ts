import { Component, OnInit, DoCheck } from '@angular/core';
import { MessagesService } from '../messages.service';
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit, DoCheck {
  messages: string[] = ['nice to meet me'];
  constructor(private messagesService: MessagesService) {}

  ngOnInit(): void {
    this.getMessages();
  }

  ngDoCheck(): void {
    this.getMessages();
  }

  getMessages = () => {
    this.messagesService.getMessages().subscribe((messages) => {
      this.messages = messages;
    });
  };

  close = (message: string) => {
    this.messagesService.close(message);
  };
}
