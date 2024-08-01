import { Component, OnInit } from '@angular/core';
import { MgtService } from '../../services/mgt.service';
import { Card } from '../../models/card';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule
  ],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.css'
})
export class CardListComponent implements OnInit {
  
  cardList: Card[] = [];
  
  ngOnInit(): void {
    this.loadAllCards();
  }

  constructor(private mtgService: MgtService) {
  }

  loadAllCards(): void {
    this.mtgService.getCards().subscribe({
      next: (data: any) => {
        if (data.cards && Array.isArray(data.cards)) {
          data.cards.forEach((cardData: any) => {
            if (cardData.imageUrl != undefined) {
              const card = new Card(
                cardData.name,
                cardData.type,
                cardData.rarity,
                cardData.number,
                cardData.imageUrl
              );
              this.cardList.push(card);
            }
          });
        }
      }
    });
  }

}
