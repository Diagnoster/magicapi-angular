import { Component, OnInit } from '@angular/core';
import { MgtService } from '../../services/mgt.service';
import { Card } from '../../models/card';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import {MatDialogModule, MatDialog} from '@angular/material/dialog';
import { CardDetailsComponent } from '../card-details/card-details.component';



@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDialogModule
  ],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.css'
})
export class CardListComponent implements OnInit {
  
  cardList: Card[] = [];
  
  ngOnInit(): void {
    this.loadAllCards();
  }

  constructor(private mtgService: MgtService, public dialog: MatDialog) {
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
                cardData.text,
                cardData.imageUrl
              );
              this.cardList.push(card);
            }
          });
        }
      }
    });
  }

  cardDetails(card: any) {
    this.dialog.open(CardDetailsComponent, {
      data: { card },
    });
  }

}
