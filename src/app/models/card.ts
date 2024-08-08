export class Card {
  name: string;
  type: string;
  rarity: string;
  set: string;
  setName: string;
  cmc: string;
  number: string;
  text: string;
  power: string;
  toughness: string;
  imageUrl: string;
  flavor: string;

  constructor(name: string, type: string, rarity: string, set: string, setName: string, cmc: string, number: string, text: string, power: string, toughness: string, imageUrl: string, flavor: string) {
    this.name = name;
    this.type = type;
    this.rarity = rarity;
    this.set = set;
    this.setName = setName;
    this.cmc = cmc;
    this.number = number;
    this.text = text;
    this.power = power;
    this.toughness = toughness;
    this.imageUrl = imageUrl;
    this.flavor = flavor;
  }
 }
