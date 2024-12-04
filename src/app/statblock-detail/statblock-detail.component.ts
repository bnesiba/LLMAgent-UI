import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AgentChatService, StatBlock, } from '../agent-chat.service';

@Component({
  selector: 'app-statblock-detail',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, FormsModule, MatFormFieldModule, MatInputModule, CommonModule, MatProgressSpinnerModule],
  templateUrl: './statblock-detail.component.html',
  styleUrl: './statblock-detail.component.scss'
})
export class StatblockDetailComponent implements OnInit {
  public referenceId: string = 'IdNotSet!';
  public statblock!: StatBlock;
  public statblockLoaded = false;
  constructor(private route: ActivatedRoute, private dataSvc: AgentChatService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.referenceId = params['id'];
      this.dataSvc.GetStatblockDetail(this.referenceId).subscribe(data => {
        this.statblock = data;
        this.statblockLoaded = true;
      });
    });
  }

  getAttributeKeys(attributes: { [key: string]: any }): string[] {
    return Object.keys(attributes);
  }
  
}
