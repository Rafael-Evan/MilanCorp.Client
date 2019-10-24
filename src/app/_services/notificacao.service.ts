import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificacaoService {

  private baseUrl = `${environment.apiUrl}notificacao`;

  constructor(private http: HttpClient) { }

  CadastrarNotificacao(model: any) {
    return this.http
      .post(`${this.baseUrl}`, model);
  }

  ListarNotificacoes() {
    return this.http.get(`${this.baseUrl}`);
  }

  ExpiraEm() {
    return [
      { nome: '5 Dias', dias: 5 },
      { nome: '7 Dias', dias: 7 },
      { nome: '15 Dias', dias: 15 }
    ]
  }
}
