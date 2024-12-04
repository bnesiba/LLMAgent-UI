import { Component, ElementRef, EventEmitter, Input, input, Output, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';


@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, FormsModule, MatFormFieldModule, MatInputModule, CommonModule, MatProgressSpinnerModule, MatSelectModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  userName: string = '';
  inputDisabled = false;
  buttonText = "Set";
  @Input() chatVisible: boolean = false;
  @Output() userNameSet: EventEmitter<{userName: string}> = new EventEmitter<{userName: string}>();

  setUserName() {
    this.inputDisabled = !!!this.inputDisabled;
    if(!this.inputDisabled) {
      this.userName = '';
      this.buttonText = "Set";
    }
    else{
      this.buttonText = "Edit";
    }
    this.userNameSet.emit({userName: this.userName});
  }
}
