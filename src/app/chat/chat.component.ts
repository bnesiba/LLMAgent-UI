import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, OnChanges, SimpleChanges, OnInit, DoCheck, AfterViewChecked} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { Subject } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    CommonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements AfterViewChecked, OnInit {
  

  @ViewChild('messageContainer') messageContainer!: ElementRef;
  @Input() messages: { id: number, user: string, text: string, references?: { title: string, url: string }[] }[] = [];
  @Input() waitingForResponse = false;
  @Input() chatVisible: boolean = false;
  @Output() submitMessage: EventEmitter<string> = new EventEmitter<string>();
  currentMessage: string = '';
  nextMessageId: number = 1;
  listChangeSubject = new Subject<void>();//kinda gross :(
  currentListLength = 0;//kinda gross :(


  ngOnInit(): void {
    this.listChangeSubject.subscribe(() => {
      this.scrollToBottom();
    });
  }


  ngAfterViewChecked(): void {
    if(this.messages && this.messages.length > this.currentListLength){
      this.currentListLength = this.messages.length;
      this.listChangeSubject.next();
    }
  }

  sendMessage() {
    if (this.currentMessage.trim()) {
      this.submitMessage.emit(this.currentMessage);
      this.currentMessage = '';
    }
  }

  scrollToMessage(messageId: number) {
    const messageElement = this.messageContainer.nativeElement.querySelector(messageId);
    messageElement?.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToBottom() {
    const messageElements = this.messageContainer?.nativeElement.querySelectorAll('.message');
    if(messageElements){
      const lastMessageElement = messageElements[messageElements.length - 1];
      lastMessageElement?.scrollIntoView(false);
    }
  }
}
