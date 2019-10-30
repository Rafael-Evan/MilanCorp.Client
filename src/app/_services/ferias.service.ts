import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeriasService {

  private baseUrl = `${environment.apiUrl}ferias`;

  constructor(private http: HttpClient) { }


  ListarSolicitacaoDeFerias() {
    return this.http.get(`${this.baseUrl}`);
  }

  MinhaSolicitacaoDeFerias(id: any) {
    return this.http.get(`${this.baseUrl}/MinhaSolicitacaoDeFerias?userId=` + id);
  }

  AtualizarStatusDaSolicitacao(id: any, status: any) {
    return this.http.put(`${this.baseUrl}?id=` + id + '&status=' +  status, status);
  }

  AdicionarSolicitacaoDeFerias(model: any) {
    return this.http
      .post(`${this.baseUrl}`, model);
  }
}
