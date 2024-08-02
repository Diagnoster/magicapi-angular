import { Component, Inject, OnInit } from '@angular/core';
import { Card } from '../../models/card';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';


@Component({
  selector: 'app-card-details',
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule
  ],
  templateUrl: './card-details.component.html',
  styleUrl: './card-details.component.css'
})
export class CardDetailsComponent implements OnInit{

  card!: Card;

  ngOnInit(): void {
    
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.card = data.card;
  }

}
