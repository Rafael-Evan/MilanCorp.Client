import { Component, OnInit } from '@angular/core';
import { EventoService } from '../_services/evento.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  baseUrl = 'https://localhost:44361/api/evento';

  constructor(private authService: EventoService) { }

  ngOnInit() {
    this.authService.Eventos();
  }
}
