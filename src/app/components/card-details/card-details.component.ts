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
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';


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
  animations: [
    trigger('bounceInLeft', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        animate('0.6s', keyframes([
          style({ transform: 'translateX(-100%)', offset: 0 }),
          style({ transform: 'translateX(30%)', offset: 0.6 }),
          style({ transform: 'translateX(-10%)', offset: 0.75 }),
          style({ transform: 'translateX(0)', offset: 1 })
        ]))
      ])
    ])
  ],
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})
export class CardDetailsComponent implements OnInit {

  card!: Card;
  cardList: Card[] = [];
  currentIndex: number = 0;
  bounceIn = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.card = data.card;
    this.cardList = data.cardList;
    this.currentIndex = this.cardList.indexOf(this.card);
  }

  ngOnInit(): void {
    this.card.text = this.replaceTapSymbol(this.card.text);
  }

  replaceTapSymbol(text: string): string {
    const symbolMap: { [key: string]: string } = {
      '{T}': 'flip.png',
      '{U}': 'ink_magic.png',
      '{B}': 'skull.png',
      '{R}': 'flame.png',
      '{G}': 'tree.png',
      '{X}': 'x.png',
      '{C}': 'mana_symbol.png',
      '{W}': 'asterisk.png'
    };
  
    for (const symbol in symbolMap) {
      const imgTag = `<img class="flip-img" src="${symbolMap[symbol]}" alt="${symbolMap[symbol].split('.')[0]} icon">`;
      text = text.replace(new RegExp(symbol, 'g'), imgTag);
    }
  
    return text;
  }
  

  getColorForSet(set: string): string {
    return Set[set as keyof typeof Set];
  }

  nextCard(next: boolean): void {
    if (this.cardList.length === 0) return;

    if (next) {
      this.currentIndex = (this.currentIndex + 1) % this.cardList.length;
    } else {
      this.currentIndex = (this.currentIndex - 1 + this.cardList.length) % this.cardList.length;
    }

    this.card = this.cardList[this.currentIndex];
    this.card.text = this.replaceTapSymbol(this.card.text);

    this.bounceIn = false;
    setTimeout(() => this.bounceIn = true, 0);
  }
}
