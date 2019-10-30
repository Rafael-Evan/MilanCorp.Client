import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Calendar } from '@fullcalendar/core';
import brLocale from '@fullcalendar/core/locales/pt-br';
import listPlugin from '@fullcalendar/list';

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

  ListarReunioes() {
    const calendarEl = document.getElementById('calendar');

    const calendar = new Calendar(calendarEl, {
      plugins: [ listPlugin ],
      defaultView: 'listWeek',
      header: {
        center: 'month',
        right: 'agendaFourDay',
      },
      locale: brLocale,
      defaultDate: new Date(),
      navLinks: true, // can click day/week names to navigate views
      editable: true,
      selectable: true,
      eventLimit: true,
      eventSources: [
        // your event source
        {
          url: this.baseUrl,
          type: 'GET',
          data: {
            custom_param1: 'something',
            custom_param2: 'somethingelse'
          },
          error() {
            alert('there was an error while fetching events!');
          },
          color: 'skyblue',   // a non-ajax option
          textColor: 'black'
        }
      ],
    });
    calendar.render();
  }

  ExcluirReuniao(id: any) {
    return this.http.delete(`${this.baseUrl}/` + id);
  }

  SalaDeReuniao() {
    return [
      { sala: 'São Paulo', andar: 'Térreo', id: 1 },
      { sala: 'Dubai', andar: 'Térreo', id: 2 },
      { sala: 'Milão', andar: 'Primeiro', id: 3 },
      { sala: 'Paris', andar: 'Segundo', id: 4 }
    ]
  }

  LocalDaReuniao() {
    return [
      { nome: 'Rua Quatá - Vila Olímpia', id: 1 },
      { nome: 'Milan Leilões - Pátio Raposo Tavares', id: 2 },
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
