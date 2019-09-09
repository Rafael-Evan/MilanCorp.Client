import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Calendar } from '@fullcalendar/core';
import listPlugin from '@fullcalendar/list';
import brLocale from '@fullcalendar/core/locales/pt-br';
import dayGridPlugin from '@fullcalendar/daygrid';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private baseUrl = `${environment.apiUrl}evento`;

  constructor(private http: HttpClient) { }


  Eventos() {
    // tslint:disable-next-line: prefer-const
    let calendarEl = document.getElementById('calendar');

    const calendar = new Calendar(calendarEl, {
      plugins: [dayGridPlugin],
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'today,dayGridMonth,dayGridDay',
      },
      locale: brLocale,
      defaultDate: '2019-08-15',
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
            textColor: 'black' // a non-ajax option
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
          textColor: 'black' // a non-ajax option
        }
      ]
    });
    calendar.render();
  }

  CadastrarEvento(model: any) {
    return this.http
    .post(`${this.baseUrl}/cadastrarEvento`, model);
  }

}
