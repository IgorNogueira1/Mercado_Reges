import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Clientes } from '../models/clientes';

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private apiUrl = ''; //Verificar com enzo sobre a URL da API

  constructor(private http: HttpClient) {}

  getAll(): Observable<Clientes[]> {
    return this.http.get<Clientes[]>(this.apiUrl);
  }

  getById(id: number): Observable<Clientes> {
    return this.http.get<Clientes>(`${this.apiUrl}/${id}`);
  }

  create(cliente: Clientes): Observable<Clientes> {
    return this.http.post<Clientes>(this.apiUrl, cliente);
  }

  update(id: number, cliente: Clientes): Observable<Clientes> {
    return this.http.put<Clientes>(`${this.apiUrl}/${id}`, cliente);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
