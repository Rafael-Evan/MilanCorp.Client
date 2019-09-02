import { Component, OnInit } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    document.addEventListener('DOMContentLoaded', function () {
      var calendarEl = document.getElementById('calendar');

      let calendar = new Calendar(calendarEl, {
        locale: 'pt-br',
        plugins: [dayGridPlugin],
        header: {
          left: 'prevYear,nextYear today',
          center: 'title',
          right: 'today,dayGridMonth,dayGridDay',
        },
        defaultDate: '2019-06-15',
        navLinks: true, // can click day/week names to navigate views
        editable: true,
        selectable: true,
        eventLimit: true,
      });
      calendar.render();
    });
  }

}
