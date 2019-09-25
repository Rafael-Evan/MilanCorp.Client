import { Component, OnInit } from '@angular/core';
import { EventoService } from '../_services/evento.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';


@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {

  evento: any;
  cadastrarEventoForm: FormGroup;

  constructor(private authService: EventoService
    , public fb: FormBuilder
    , public router: Router
    , private toastr: ToastrService) { }

  ngOnInit() {
    this.validacao();
    this.authService.listarEventos();

    $('.divcorp').hide();
    $('.divcliente').hide();

    $('input[id="Corporativo"]').change(function() {
      if ($("input[id=Corporativo][value='Sim']").prop("checked",true)) {
          $('.divcorp').show();
          $('.divcliente').hide();
      }
  });

    $('input[id="Cliente"]').change(function() {
      if ($("input[id=Cliente][value='Sim']").prop("checked",true)) {
          $('.divcliente').show();
          $('.divcorp').hide();
      }
  });
  }

  validacao() {
    this.cadastrarEventoForm = this.fb.group({
      title: [''],
      start: [''],
      end: [''],
      leilao: [''],
      nomeDoComitente: [''],
      observacao: [''],
      endereco: [''],
      tipoDeLeilao: ['']
    });
  }

  cadastrarEvento() {
    if (this.cadastrarEventoForm.valid) {
      this.evento = Object.assign(this.cadastrarEventoForm.value);
      this.authService.CadastrarEvento(this.evento).subscribe(
        () => {
          this.cadastrarEventoForm.reset();
          this.toastr.success('Evento cadastro com sucesso!');
        }, error => {
          this.toastr.error('Erro ao cadastrar o evento!');
        }
      );
    }
  }
}
