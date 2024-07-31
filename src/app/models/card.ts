export class Card {
    name: string;
    type: string;
    rarity: string;
    number: string;
    imageUrl: string;
  
    constructor(name: string, type: string, rarity: string, number: string, imageUrl: string) {
      this.name = name;
      this.type = type;
      this.rarity = rarity;
      this.number = number;
      this.imageUrl = imageUrl;
    }
   }
  