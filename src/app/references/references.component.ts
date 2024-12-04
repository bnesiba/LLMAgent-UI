import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon'
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list'; // Import MatListModule

@Component({
  selector: 'app-references',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    CommonModule],
  templateUrl: './references.component.html',
  styleUrl: './references.component.scss'
})
export class ReferencesComponent {
  @Input() references: { title: string, url: string, messageId: number }[] = [];

  scrollToMessage(messageId: number) {
    // Implement scrolling logic
  }

  public hasReferences(): boolean {
    return this.references.length > 0;
  }
}