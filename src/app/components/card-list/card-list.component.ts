import { Component, OnInit, HostListener } from '@angular/core';
import { MgtService } from '../../services/mgt.service';
import { Card } from '../../models/card';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
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
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {
  
  cardList: Card[] = [];
  currentPage = 1;
  pageSize = 100;
  totalCards = 0;
  isLoading = false;
  endCards = false;

  constructor(private mtgService: MgtService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadCards();
  }

  loadCards(): void {
    if (this.isLoading || this.endCards) return;
    this.isLoading = true;
    
    setTimeout(() => {
      this.mtgService.getCards(this.currentPage, this.pageSize).subscribe({
        next: (data: any) => {
          if (data.cards && Array.isArray(data.cards)) {
            data.cards.forEach((cardData: any) => {
              if (cardData.imageUrl != undefined) {
                const card = new Card(
                  cardData.name,
                  cardData.type,
                  cardData.rarity,
                  cardData.set,
                  cardData.setName,
                  cardData.cmc,
                  cardData.number,
                  cardData.text,
                  cardData.power,
                  cardData.toughness,
                  cardData.imageUrl
                );
                this.cardList.push(card);
              }
            });
  
            if (data.cards.length < this.pageSize) {
              this.endCards = true;
            }
            this.currentPage++;
          }
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        }
      });
    }, 2500); // delay for api request working
  }  

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight;
    const innerHeight = window.innerHeight;

    if (scrollTop + innerHeight >= scrollHeight - 50) {
      this.loadCards();
    }
  }

  cardDetails(card: any) {
    this.dialog.open(CardDetailsComponent, {
      width: '500px',
      data: { card },
    });
  }
}
