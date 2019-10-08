import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Calendar } from '@fullcalendar/core';
import listPlugin from '@fullcalendar/list';
import brLocale from '@fullcalendar/core/locales/pt-br';
import dayGridPlugin from '@fullcalendar/daygrid';
import { environment } from 'src/environments/environment';
import * as $ from 'jquery';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private baseUrl = `${environment.apiUrl}evento`;

  private baseUrlEventoLeilao = `${environment.apiUrl}eventoleilao`;

  private baseUrlAniversariantes = `${environment.apiUrl}aniversariante`;

  constructor(private http: HttpClient) { }


  Eventos() {
    // tslint:disable-next-line: prefer-const
    let calendarEl = document.getElementById('calendar');

    const calendar = new Calendar(calendarEl, {
      eventClick(info) {
        info.jsEvent.preventDefault();
        // tslint:disable-next-line: no-conditional-assignment
        if (info.event.extendedProps.ativo != null) {
          let options = { month: 'long', day: 'numeric' };
          (<any>$("#aniversariante #title")).text(info.event.title);
          (<any>$("#aniversariante #start")).text(info.event.start != null ? (info.event.start.toLocaleDateString('pt-BR', options)) : '');
          (<any>$("#aniversariante")).modal();

          // change the border color just for fun
          info.el.style.borderColor = 'black';
        } else if (info.event.extendedProps.nomeDoComitente != null && info.event.extendedProps.tipoDeLeilao != null) {
          (<any>$("#leilao #title")).text(info.event.title);
          (<any>$("#leilao #start")).text(info.event.start != null ? info.event.start.toLocaleDateString() : '');
          (<any>$("#leilao #nomeDoComitente")).text(info.event.extendedProps.nomeDoComitente);
          (<any>$("#leilao #tipoDeLeilao")).text(info.event.extendedProps.tipoDeLeilao);
          (<any>$("#leilao")).modal();

          // change the border color just for fun
          info.el.style.borderColor = 'black';
        } else {
          (<any>$("#evento #title")).text(info.event.title);
          (<any>$("#evento #start")).text(info.event.start != null ? info.event.start.toLocaleString() : '');
          (<any>$("#evento #end")).text(info.event.end != null ? info.event.end.toLocaleString() : '');
          (<any>$("#evento")).modal();

          // change the border color just for fun
          info.el.style.borderColor = 'black';
        }

      },

      plugins: [dayGridPlugin],
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'today,dayGridMonth,dayGridDay',
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
          color: 'DodgerBlue', // a non-ajax option
          textColor: 'black',
          allDayDefault: true
        },
        {
          url: this.baseUrlAniversariantes + '/' + 'AniversarianteAnoAtual',
          type: 'GET',
          data: {
            custom_param1: 'something',
            custom_param2: 'somethingelse'
          },
          error() {
            alert('there was an error while fetching events!');
          },
          color: 'SpringGreen',   // a non-ajax option
          textColor: 'black',
          allDayDefault: true
        },
        {
          url: this.baseUrlEventoLeilao,
          type: 'GET',
          data: {
            custom_param1: 'something',
            custom_param2: 'somethingelse'
          },
          error() {
            alert('there was an error while fetching events!');
          },
          color: '#eead2d',   // a non-ajax option
          textColor: 'black',
          allDayDefault: true
        }
      ]
    });
    calendar.render();
  }

  listarEventos() {
    const calendarEl = document.getElementById('calendar');

    const calendar = new Calendar(calendarEl, {
      plugins: [listPlugin],
      header: {
        right: 'today,list',
      },
      defaultView: 'listWeek',
      locale: brLocale,
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

  CadastrarEvento(model: any) {
    return this.http
      .post(`${this.baseUrl}/cadastrarEvento`, model);
  }

  CadastrarEventoLeilao(model: any) {
    return this.http
      .post(`${this.baseUrlEventoLeilao}/cadastrarEventoLeilao`, model);
  }

  TipoDeLeilao() {
    return [
      { nome: 'Imóveis', id: 1 },
      { nome: 'Veículos', id: 2 },
      { nome: 'Materiais', id: 3 },
      { nome: 'Outros', id: 4 }
    ]
  }

}
