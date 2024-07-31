import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MgtService {

  URL_BASE = 'https://api.magicthegathering.io/v1';

  constructor(private http: HttpClient) { }

  getCards(): Observable<any> {
    const url =`${this.URL_BASE}/cards`;
    return this.http.get<any>(url);
  }

}
