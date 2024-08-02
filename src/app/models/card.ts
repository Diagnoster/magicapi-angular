export class Card {
  name: string;
  type: string;
  rarity: string;
  set: string;
  number: string;
  text: string;
  imageUrl: string;

  constructor(name: string, type: string, rarity: string, set: string, number: string, text: string, imageUrl: string) {
    this.name = name;
    this.type = type;
    this.rarity = rarity;
    this.set = set;
    this.number = number;
    this.imageUrl = imageUrl;
    this.text = text;
  }
 }
