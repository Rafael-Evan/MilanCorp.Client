import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Calendar } from '@fullcalendar/core';
import listPlugin from '@fullcalendar/list';
import brLocale from '@fullcalendar/core/locales/pt-br';
import dayGridPlugin from '@fullcalendar/daygrid';
import { environment } from 'src/environments/environment';
import * as $ from 'jquery';
import { FormBuilder, FormGroup } from '@angular/forms';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  editarEventoCorpForm: FormGroup;

  idEvento: any;

  private baseUrl = `${environment.apiUrl}evento`;

  private baseUrlEventoLeilao = `${environment.apiUrl}eventoleilao`;

  private baseUrlAniversariantes = `${environment.apiUrl}aniversariante`;

  private baseUrlReunioes = `${environment.apiUrl}reuniao`;

  constructor(private http: HttpClient
    , public fb: FormBuilder) { }

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
          (<any>$("#leilao #id")).text(info.event.id);
          (<any>$("#leilao #title")).text(info.event.title);
          (<any>$("#leilao #start")).text(info.event.start != null ? info.event.start.toLocaleDateString() : '');
          (<any>$("#leilao #nomeDoComitente")).text(info.event.extendedProps.nomeDoComitente);
          (<any>$("#leilao #tipoDeLeilao")).text(info.event.extendedProps.tipoDeLeilao);
          (<any>$("#leilao #title")).val(info.event.title);
          (<any>$("#leilao #start")).val(info.event.start != null ? info.event.start.toLocaleString() : '');
          (<any>$("#leilao #nomeDoComitente")).val(info.event.extendedProps.nomeDoComitente);
          (<any>$("#leilao #tipoDeLeilao")).val(info.event.extendedProps.tipoDeLeilao);
          (<any>$("#leilao #endereco")).val(info.event.extendedProps.endereco);
           (<any>$("#leilao #observacao")).val(info.event.extendedProps.observacao);
          (<any>$("#leilao")).modal();

          // change the border color just for fun
          info.el.style.borderColor = 'black';
        } else if (info.event.extendedProps.departamento != null && info.event.extendedProps.sala != null) {
          let options = { month: 'numeric', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' };
          (<any>$("#reuniao #id")).val(info.event.id);
          (<any>$("#reuniao #title")).text(info.event.title);
          (<any>$("#reuniao #responsavel")).text(info.event.extendedProps.user.fullName);
          (<any>$("#reuniao #userId")).text(info.event.extendedProps.user.id);
          (<any>$("#reuniao #departamento")).text(info.event.extendedProps.departamento);
          (<any>$("#reuniao #start")).text(info.event.start != null ? (info.event.start.toLocaleDateString('pt-BR', options)) : '');
          // tslint:disable-next-line: max-line-length
          (<any>$("#reuniao #sala")).text(info.event.extendedProps.sala == 1 ? 'São Paulo' : info.event.extendedProps.sala == 2 ? 'Dubai' : info.event.extendedProps.sala == 3 ? 'Milão' : info.event.extendedProps.sala == 4 ? 'Paris' : '');
          (<any>$("#reuniao #start")).text(info.event.start != null ? (info.event.start.toLocaleDateString('pt-BR', options)) : '');
          (<any>$("#reuniao #end")).text(info.event.end != null ? (info.event.end.toLocaleDateString('pt-BR', options)) : '');
          (<any>$("#reuniao")).modal();

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
      navLinks: true,
      editable: true,
      selectable: true,
      eventLimit: 3,
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
          textColor: 'black'
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
        },
        {
          url: this.baseUrlReunioes,
          type: 'GET',
          data: {
            custom_param1: 'something',
            custom_param2: 'somethingelse'
          },
          error() {
            alert('there was an error while fetching events!');
          },
          color: '#800080', // a non-ajax option
          textColor: 'white'
        },
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

  EditarEvento(id: any, model: any) {
    model.start = model.start.replace(/^(\d{0,2})\/(\d{0,2})(.*)/, '$2/$1$3');
    return this.http.put(`${this.baseUrlEventoLeilao}/` + id, model);
  }

  CancelarEvento(id: any) {
    return this.http.delete(`${this.baseUrlEventoLeilao}/` + id);
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

  LocalDoLeilao() {
    return [
      { nome: 'Rua Quatá - Vila Olímpia', id: 1 },
      { nome: 'Milan Leilões - Pátio Raposo Tavares', id: 2 },
    ]
  }

  ListarEventoLeilaoPorData(model: any) {
    return this.http
      // tslint:disable-next-line: max-line-length
      .get(`${this.baseUrlEventoLeilao}/PorData?dataInicial=` + model.dataInicial + '&dataFinal=' + model.dataFinal + '&nomeDoComitente=' + model.nomeDoComitente + '&tipoDeLeilao=' + model.tipoDeLeilao);
 }

}
