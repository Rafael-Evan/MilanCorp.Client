import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PortasAbertasService {

  private baseUrl = `${environment.apiUrl}comunicacao`;

  constructor(private http: HttpClient) { }

  FinalidadeDaMensagem() {
    return [
      { nome: 'Reclamação', id: 1 },
      { nome: 'Sugestão', id: 2 },
      { nome: 'Elogio', id: 3 }
    ]
  }

  EnviarSugestao(model: any) {
    return this.http
      // .post(`${this.baseUrl}`, model);
      .post(`${this.baseUrl}/PortasAbertas?finalidade=` + model.finalidade + '&mensagem=' + model.mensagem, model);
  }
}
