import { Component, OnInit } from '@angular/core';
import { EventoService } from '../_services/evento.service';
import { AniversarianteService } from '../_services/aniversariante.service';
import { ClimaTempoService } from '../_services/clima-tempo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  climaTempo: any;

  constructor(private EventoService: EventoService
    , private ClimaTempoService: ClimaTempoService) { }

  ngOnInit() {
    this.EventoService.Eventos();
    this.climaTempo = this.ClimaTempoService.ListarClimaTempo();
  }
}
