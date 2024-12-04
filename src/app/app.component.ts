import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public isChatVisible: boolean = false;
  public opportunityIdSet: boolean = false;
  messages: any[] = [];
  references: any[] = [];
  waitingForResponse: boolean = false;
  nextMessageId: number = 1;
  sessionId: string = "sessionIdNotSet!";

  constructor() {}


}
