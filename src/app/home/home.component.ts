import { Component, OnInit } from '@angular/core';
import { EventoService } from '../_services/evento.service';
import { AniversarianteService } from '../_services/aniversariante.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private EventoService: EventoService) { }

  ngOnInit() {
    this.EventoService.Eventos();
  }
}
