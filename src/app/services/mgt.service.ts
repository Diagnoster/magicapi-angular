import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../models/card';

@Injectable({
  providedIn: 'root'
})
export class MgtService {

  URL_BASE = 'https://api.magicthegathering.io/v1';

  constructor(private http: HttpClient) { }

  getCards(page: number, pageSize: number): Observable<Card> {
    const url = `${this.URL_BASE}/cards?page=${page}&pageSize=${pageSize}`;
    return this.http.get<Card>(url);
  }

  getFilteredCards(name: string): Observable<any> {
    const url = `${this.URL_BASE}/cards?name=${name}`;
    return this.http.get<any>(url);
  }
}
