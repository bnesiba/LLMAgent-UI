import { Routes } from '@angular/router';
import { StatblockDetailComponent } from './statblock-detail/statblock-detail.component';
import { ChatbotShellComponent } from './chatbot-shell/chatbot-shell.component';

export const routes: Routes = [
    {path: 'references/:refType/:id', component: StatblockDetailComponent},
    {path: 'chat', component: ChatbotShellComponent}
];
