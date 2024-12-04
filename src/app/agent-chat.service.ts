import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'

})
export class AgentChatService {
  private baseUrl = 'https://localhost:7297/api/Chat/';
  private refUrl = 'https://localhost:7297/api/References/';
  private headerObj = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) {
  }


  public SendChatMessage(message: string, sessionId: string): Observable<AgentChatResponse> {
    return this.http.post(this.baseUrl + `sessionChat/${sessionId}`, JSON.stringify(message), this.headerObj) as Observable<AgentChatResponse>;
  }

  public GetInitialData(userName: string): Observable<any> {
    return this.http.get(this.baseUrl + `init/${userName}`) as Observable<AgentChatResponse>;
  }

  public GetStatblockDetail(referenceId: string): Observable<StatBlock> {
    return this.http.get(this.refUrl + `statblock/${referenceId}`) as Observable<StatBlock>;
  }
}

export class StatBlock {
  name: string;
  size: string;
  type: string;
  alignment: string;
  armorClass: string | number;
  hitPoints: string;
  speed: string;
  challengeRating: string;
  attributes: { [key: string]: Attribute };
  actions: Action[];

  constructor(data: Partial<StatBlock>) {
    this.name = data.name || '';
    this.size = data.size || '';
    this.type = data.type || '';
    this.alignment = data.alignment || '';
    this.armorClass = data.armorClass || 0;
    this.hitPoints = data.hitPoints || '';
    this.speed = data.speed || '';
    this.challengeRating = data.challengeRating || '0';
    this.attributes = data.attributes || {};
    this.actions = data.actions || [];
  }
}

export class Attribute {
  value: number;
  modifier: string;

  constructor(value: number, modifier: string) {
    this.value = value;
    this.modifier = modifier;
  }
}

export class Action {
  name: string;
  description: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
}


export class AgentReferenceResult {
  public refType: string;
  public refDate: Date;
  public refId: string;

  constructor(refType: string, refDate: string, refId: string) {
    this.refType = refType;
    this.refDate = new Date(refDate);
    this.refId = refId;
  }

  public GetTitle(): string {
    return `${this.refType} - ${this.refDate.toDateString()}`;
  }

  public GetUrl(): string {
    //return `https://vuhl-dev.redchimney.com/apps/communicationssearchapi/commSearch/details/${this.refId}`;
    return `http://localhost:4200/references/${this.refType}/${this.refId}`;
  }
}

// export class AgentChatResponse{
//   public input : string;
//   public output: string;

//   constructor(input: string, output: string){
//     this.input = input;
//     this.output = output;
//   }
// }

// export class AgentChatResult{
//   public response : AgentChatResponse;
//   public sessionId: string;
//   public references: AgentReferenceResult[];

//   constructor(chatResponse: AgentChatResponse, sessionId: string, referencedIds: AgentReferenceResult[]){
//     this.response = chatResponse;
//     this.sessionId = sessionId;
//     this.references = referencedIds;
//   }
// }

export class AgentChatResponse {
  public message: string
  public sessionId: string | undefined
  public chatReferences: AgentReferenceResult[]

  constructor(msg: string, session: string | undefined) {
    this.message = msg;
    this.sessionId = session;
    this.chatReferences = []
  }
}