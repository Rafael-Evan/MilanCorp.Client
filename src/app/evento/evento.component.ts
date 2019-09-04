import { Component, OnInit } from '@angular/core';
import { EventoService } from '../_services/evento.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {

  evento: any;
  cadastrarEventoForm: FormGroup;

  baseUrl = 'https://localhost:44361/api/evento';

  constructor(private authService: EventoService
    , public fb: FormBuilder
    , public router: Router
    , private toastr: ToastrService) { }

  ngOnInit() {
    this.authService.listarEventos();
  }

  validation() {
    this.cadastrarEventoForm = this.fb.group({
      title: [''],
      start: [''],
      end: [''],
    });
  }

  cadastrarEvento() {
    if (this.cadastrarEventoForm.valid) {
      this.evento = Object.assign(this.cadastrarEventoForm.value);
      this.authService.CadastrarEvento(this.evento).subscribe(
        () => {
          this.toastr.success('Evento cadastro com sucesso!');
        }, error => {
          this.toastr.error('Erro ao cadastrar o evento!');
        }
      );
    }
  }
}
