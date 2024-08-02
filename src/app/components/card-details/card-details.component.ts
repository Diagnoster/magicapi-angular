import { Component, Inject, OnInit } from '@angular/core';
import { Card } from '../../models/card';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { Set } from '../../models/enum/card';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';



@Component({
  selector: 'app-card-details',
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    CommonModule,
    MatTabsModule
  ],
  templateUrl: './card-details.component.html',
  styleUrl: './card-details.component.css'
})
export class CardDetailsComponent implements OnInit{

  card!: Card;
  lotsOfTabs = new Array(30).fill(0).map((_, index) => `Tab ${index}`);


  ngOnInit(): void {
    
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.card = data.card;
  }

  getColorForSet(set: string): string {
    console.log(set);
    return Set [set as keyof typeof Set];
  }

}
