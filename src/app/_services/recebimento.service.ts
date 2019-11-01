import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecebimentoService {

  private baseUrl = `${environment.apiUrl}recebimento`;

  constructor(private http: HttpClient) { }

  AdicionarRecebimentoDeCorrespondencia(model: any) {
    return this.http
      .post(`${this.baseUrl}`, model);
  }

  ListarRecebimentos() {
       return this.http
         .get(`${this.baseUrl}`);
    }

  // ListarMeusRecebimentos(id: any) {
  //   return this.http
  //     .get(`${this.baseUrl}/MeusRecebimentos?userId=` + id);
  // }

  AtualizarStatusDoRecebio(id: any, status: any) {
    return this.http.put(`${this.baseUrl}?id=` + id + '&status=' +  status, status);
  }
}
