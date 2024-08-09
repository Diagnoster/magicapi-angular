import { Component, OnInit, HostListener } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, switchMap, map, startWith, filter } from 'rxjs/operators';
import { MgtService } from '../../services/mgt.service';
import { Card } from '../../models/card';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { CardDetailsComponent } from '../card-details/card-details.component';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AsyncPipe } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatProgressBarModule
  ],
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {
  
  cardList: Card[] = [];
  filteredCards: Card[] = [];
  searchControl = new FormControl('');
  currentPage = 1;
  pageSize = 100;
  totalCards = 0;
  isLoading = false;
  endCards = false;
  loading: boolean = true;

  private searchTerms = new Subject<string>();

  constructor(private mtgService: MgtService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadCards();
  
    this.searchControl.valueChanges.pipe(
      debounceTime(300), // wait 300ms
      filter(term => term !== ''),
      switchMap(term => this.mtgService.getFilteredCards(term!)),
      map(response => response.cards || [])
    ).subscribe(cards => {
      this.loading = true;
      this.filteredCards = cards
        .filter((cardData: any) => cardData.imageUrl !== undefined)
        .map((cardData: any) => new Card(
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
          cardData.imageUrl,
          cardData.flavor
        ));
        this.loading = false;
    });
  
   // if term = ''
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      filter(term => term === ''), 
      switchMap(() => {
        // reset variables and card list
        this.cardList = [];
        this.currentPage = 1;
        this.pageSize = 100;
        return of(this.loadCards());
      })
    ).subscribe();
  }

  loadCards(): void {
    this.loading = true;
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
                  cardData.imageUrl,
                  cardData.flavor
                );
                this.cardList.push(card);
              }
            });

            if (data.cards.length < this.pageSize) {
              this.endCards = true;
            }
            this.currentPage++;
          }
          this.loading = false;
          this.isLoading = false;
        },
        error: () => {
          this.loading = false;
          this.isLoading = false;
        }
      });
    }, 2500); // delay for API request working
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

  onCardSelected(card: Card): void {
    this.cardList = [card];
  }

  cardDetails(card: any) {
    this.dialog.open(CardDetailsComponent, {
      width: '500px',
      data: { card },
    });
  }
}
