import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { ReferencesComponent } from '../references/references.component';
import { ChatComponent } from '../chat/chat.component';
import { LandingComponent } from '../landing/landing.component';
import { AgentChatService, AgentReferenceResult } from '../agent-chat.service';

@Component({
  selector: 'app-chatbot-shell',
  standalone: true,
  imports: [ChatComponent, ReferencesComponent, LandingComponent, MatProgressSpinnerModule, CommonModule ],
  templateUrl: './chatbot-shell.component.html',
  styleUrl: './chatbot-shell.component.scss'
})
export class ChatbotShellComponent {
  public isChatVisible: boolean = false;
  public userNameSet: boolean = false;
  messages: any[] = [];
  references: any[] = [];
  waitingForResponse: boolean = false;
  nextMessageId: number = 1;
  sessionId: string = "sessionIdNotSet!";

  constructor(private dataSvc: AgentChatService) {}

  UserNameSet(userNameSetEvent: any) {
    if(userNameSetEvent.userName){
      this.userNameSet = true;
      console.log('Starting chat with user:', userNameSetEvent.userName);
      this.dataSvc.GetInitialData(userNameSetEvent.userName).subscribe(data => {
        console.log('Initial data:', data);
        // Add initial data to chat
        this.messages.push({ id: this.nextMessageId++,user:"Bot", text: data["message"] });
        this.sessionId = data["sessionId"];
        this.isChatVisible = true;
        //this.references = [{ title: 'Reference 1', url: '#' }];
      });
      // Initialize chat session
      
    }else{
      this.userNameSet = false;
      console.log('Ending chat with user:', userNameSetEvent.userName);
      this.references = [];
      this.messages = [];
      // End chat session
      this.isChatVisible = false;
    }
    
  }

  private GetReferenceTitle(reference: AgentReferenceResult): string {
     return `> ${reference.refType} - ${new Date(reference.refDate).toDateString()}`;
  }

  private GetReferenceUrl(reference: AgentReferenceResult): string {
    return `http://localhost:4200/references/${reference.refType}/${reference.refId}`;//TODO: get this from config or something?
  }

  onSendMessage(message: string) {
    if (message.trim()) {
      this.waitingForResponse = true;
      this.messages.push({ id: this.nextMessageId++,user:"User", text: message });

      this.dataSvc.SendChatMessage(message, this.sessionId).subscribe(data => {
        var references = data.chatReferences ?? []
        var referenceList: { title: any; url: any; }[] = [];
        
        references.forEach((reference: AgentReferenceResult) => {
          referenceList.push({ title: this.GetReferenceTitle(reference), url: this.GetReferenceUrl(reference) });
        });


        this.messages.push({ id: this.nextMessageId++,user:"Bot", text: data.message, references: referenceList });
        this.waitingForResponse = false;
      });    
  }
}

}
