import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Venda } from '../models/venda';
import { ItemVenda } from '../models/item-venda';

@Injectable({ providedIn: 'root' })
export class VendaService {
  private apiUrl = ''; // verificar com o Enzo

  constructor(private http: HttpClient) {}

  getAll(): Observable<Venda[]> {
    return this.http.get<Venda[]>(this.apiUrl);
  }

  getById(id: number): Observable<Venda> {
    return this.http.get<Venda>(`${this.apiUrl}/${id}`);
  }

  create(venda: Venda): Observable<Venda> {
    return this.http.post<Venda>(this.apiUrl, venda);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
