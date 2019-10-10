import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReuniaoService {

  private baseUrl = `${environment.apiUrl}reuniao`;

  constructor(private http: HttpClient) { }

  AdicionarReuniao(model: any) {
    return this.http
      .post(`${this.baseUrl}/cadastrarReuniao`, model);
  }

  SalaDeReuniao() {
    return [
      { sala: 'São Paulo', andar: 'Térreo', id: 1 },
      { sala: 'Dubai', andar: 'Térreo', id: 2 },
      { sala: 'Milão', andar: 'Primeiro', id: 3 },
      { sala: 'Paris', andar: 'Segundo', id: 4 }
    ]
  }

  Departamentos() {
    return [
      { nome: 'Diretoria', id: 1 },
      { nome: 'Geral', id: 2 },
      { nome: 'Comercial', id: 3 },
      { nome: 'Financeiro', id: 4 },
      { nome: 'RH', id: 5 },
      { nome: 'TI', id: 6 }
    ]
  }
}
