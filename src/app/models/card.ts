import { Legalities } from "./legalities";

export class Card {
  name: string;
  type: string;
  rarity: string;
  set: string;
  setName: string;
  cmc: string;
  number: string;
  text: string;
  artist: string;
  power: string;
  toughness: string;
  imageUrl: string;
  flavor: string;
  legalities: Legalities[];

  constructor(name: string, type: string, rarity: string, set: string, setName: string, cmc: string, number: string, text: string, artist: string, power: string, toughness: string, imageUrl: string, flavor: string, legalities: Legalities[]) {
    this.name = name;
    this.type = type;
    this.rarity = rarity;
    this.set = set;
    this.setName = setName;
    this.cmc = cmc;
    this.number = number;
    this.text = text;
    this.artist = artist;
    this.power = power;
    this.toughness = toughness;
    this.imageUrl = imageUrl;
    this.flavor = flavor;
    this.legalities = legalities;
  }
 }
