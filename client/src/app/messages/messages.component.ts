import { Component, OnInit } from '@angular/core';
import { Message } from '../_models/message';
import { Pagination } from '../_models/pagination';
import { MessageService } from '../_services/message.service';



@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})



export class MessagesComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  container = 'Unread';
  PageNumber = 1;
  PageSize = 5;
  loading = true;



  constructor(private messageService: MessageService) { }



  ngOnInit(): void {
    this.loadMessages();
  }



  loadMessages() {
    this.loading = true;
    this.messageService.getMessages(this.PageNumber, this.PageSize, this.container).subscribe(response => {
      this.messages = response.result;
      this.pagination = response.pagination;
      this.loading = false;
    })
  }



  pageChanged(event: any) {
    this.PageNumber = event.page;
    this.loadMessages();
  }

  deleteMessage(id: number) {
    this.messageService.deleteMessage(id).subscribe(() => {
      this.messages.splice(this.messages.findIndex(m => m.id === id), 1);
    })
  }
}
