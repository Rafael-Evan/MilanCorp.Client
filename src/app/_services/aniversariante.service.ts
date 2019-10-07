import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpEventType, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Calendar } from '@fullcalendar/core';
import brLocale from '@fullcalendar/core/locales/pt-br';
import dayGridPlugin from '@fullcalendar/daygrid';
import { environment } from 'src/environments/environment';
import { Aniversariante } from '../_models/Aniversariante';
import { TransitiveCompileNgModuleMetadata } from '@angular/compiler';
import { getLocaleDateTimeFormat } from '@angular/common';
declare var $: any;

@Injectable({
    providedIn: 'root'
})
export class AniversarianteService {

    aniversariantes: any;

    private baseUrl = `${environment.apiUrl}aniversariante`;

    constructor(private http: HttpClient) { }

    GetAniversariantes() {
        return this.http.get(`${this.baseUrl}`).subscribe(data => {
            this.aniversariantes = data;
            this.aniversariantes.forEach(element => {
                element.start = '2019-05-10T00:00:00';
            });
            data = this.aniversariantes;
        });
    }

    Aniversariantes() {

        // tslint:disable-next-line: prefer-const
        let calendarEl = document.getElementById('calendar');

        const calendar = new Calendar(calendarEl, {

            eventClick(info) {
                info.jsEvent.preventDefault();
                (<any>$("#visualizar #title")).text(info.event.title);
                (<any>$("#visualizar #start")).text(info.event.start != null ? info.event.start.toLocaleDateString() : '');
                (<any>$("#visualizar")).modal();

                // change the border color just for fun
                info.el.style.borderColor = 'black';
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
                    textColor: 'black',
                    allDayDefault: true
                }
            ]
        });
        calendar.render();
    }

}