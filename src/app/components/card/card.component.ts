import {Component} from '@angular/core';

@Component({
  selector: 'card',
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title class="title">
          Default Title
        </mat-card-title>
      </mat-card-header>
      <mat-card-content class="content">
          Default Content
      </mat-card-content>
    </mat-card>
  `
})
export class CardComponent {

}