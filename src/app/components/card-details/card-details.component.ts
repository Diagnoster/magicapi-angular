import { Component, Inject, OnInit } from '@angular/core';
import { Card } from '../../models/card';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { Set } from '../../models/enum/set';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-card-details',
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    CommonModule,
    MatTabsModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})
export class CardDetailsComponent implements OnInit {

  card!: Card;
  cardList: Card[] = [];
  currentIndex: number = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.card = data.card;
    this.cardList = data.cardList;
    this.currentIndex = this.cardList.indexOf(this.card);
  }

  ngOnInit(): void {}

  getColorForSet(set: string): string {
    return Set[set as keyof typeof Set];
  }

  nextCard(next: boolean): void {
    if (this.cardList.length === 0) return;

    if(next) {
      this.currentIndex = (this.currentIndex + 1) % this.cardList.length;
      this.card = this.cardList[this.currentIndex];
    }
    else {
      this.currentIndex = (this.currentIndex - 1) % this.cardList.length;
      this.card = this.cardList[this.currentIndex];
    }
  }
}
