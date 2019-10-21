import { Component, OnInit } from '@angular/core';
import { EventoService } from '../_services/evento.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import { ComitenteService } from '../_services/comitente.service';


@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {

  evento: any;
  cadastrarEventoCorpForm: FormGroup;
  cadastrarEventoClienteForm: FormGroup;
  tipoDeLeilao: any[];
  comitentes: any;
  LocalDoLeilao: any[];

  constructor(private authService: EventoService
    , private comitenteService: ComitenteService
    , public fb: FormBuilder
    , public router: Router
    , private toastr: ToastrService) { }

  ngOnInit() {
    this.validacao();
    this.LocalDoLeilao = this.authService.LocalDoLeilao();
    this.authService.listarEventos();
    this.tipoDeLeilao = this.authService.TipoDeLeilao();
    // this.comitentes = this.comitenteService.ListarComitentes();

    this.comitenteService.ListarComitentes().subscribe((data) => {
      this.comitentes = data;
    });

    // $('.divcorp').hide();
    // $('.divcliente').hide();

    // $('input[id="Corporativo"]').change(function () {
    //   if ($("input[id=Corporativo][value='Sim']").prop("checked", true)) {
    //     $('.divcorp').show();
    //     $('.divcliente').hide();
    //   }
    // });

    // $('input[id="Cliente"]').change(function () {
    //   if ($("input[id=Cliente][value='Sim']").prop("checked", true)) {
    //     $('.divcliente').show();
    //     $('.divcorp').hide();
    //   }
    // });
  }


  validacao() {
    this.cadastrarEventoCorpForm = this.fb.group({
      title: [''],
      start: [''],
      nomeDoComitente: [''],
      observacao: [''],
      endereco: [''],
      tipoDeLeilao: ['']
    });

    this.cadastrarEventoClienteForm = this.fb.group({
      title: [''],
      start: [''],
      end: [''],
    });
  }

  mostraCampo(el) {
    let inputOutros = document.getElementById('outros');
    let labelOutros = document.getElementById('labelOutros');
    if (el === 'Outros') {
      inputOutros.style.display = 'block';
    }
    else {
      inputOutros.style.display = 'none';
    }
  }

  cadastrarEvento() {
    if (this.cadastrarEventoCorpForm.valid) {
      this.evento = Object.assign(this.cadastrarEventoCorpForm.value);
      this.authService.CadastrarEventoLeilao(this.evento).subscribe(
        () => {
          this.cadastrarEventoCorpForm.reset();
          this.toastr.success('Evento cadastro com sucesso!');
        }, error => {
          this.toastr.error('Erro ao cadastrar o evento!');
        }
      );
      // } else if (this.cadastrarEventoClienteForm.valid) {
      //   this.evento = Object.assign(this.cadastrarEventoClienteForm.value);
      //   this.authService.CadastrarEvento(this.evento).subscribe(
      //     () => {
      //       this.cadastrarEventoClienteForm.reset();
      //       this.toastr.success('Evento cadastro com sucesso!');
      //     }, error => {
      //       this.toastr.error('Erro ao cadastrar o evento!');
      //     }
      //   );
    }
  }

}
