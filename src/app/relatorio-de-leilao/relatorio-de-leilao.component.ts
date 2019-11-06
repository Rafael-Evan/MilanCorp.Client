import { Component, OnInit } from '@angular/core';
import { EventoService } from '../_services/evento.service';
import { ComitenteService } from '../_services/comitente.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-relatorio-de-leilao',
  templateUrl: './relatorio-de-leilao.component.html',
  styleUrls: ['./relatorio-de-leilao.component.css']
})
export class RelatorioDeLeilaoComponent implements OnInit {

  comitentes: any;
  tipoDeLeilao: any[];
  listaDeLeiloes: any;
  relatorioLeilaoForm: FormGroup;
  fieldArray: Array<any> = [];
  pesquisa: any;

  constructor(private authService: EventoService
    , private comitenteService: ComitenteService
    , public fb: FormBuilder
    , public router: Router
    , private toastr: ToastrService) { }

  ngOnInit() {

    this.validacao();

    this.tipoDeLeilao = this.TipoDeLeilao();

    this.comitenteService.ListarComitentes().subscribe((data) => {
      this.comitentes = data;
    });
  }

  CriaPDF() {
    var minhaTabela = document.getElementById('tabela').innerHTML;
    var style = "<style>";
    style = style + "table {width: 100%;font: 20px Calibri;}";
    style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
    style = style + "padding: 2px 3px;text-align: center;}";
    style = style + "</style>";
    // CRIA UM OBJETO WINDOW
    var win = window.open('', '', 'height=700,width=700');
    win.document.write('<html><head>');
    win.document.write('<title>Empregados</title>');
    win.document.write(style);
    win.document.write('</head>');
    win.document.write('<body>');
    win.document.write(minhaTabela);
    win.document.write('</body></html>');
    win.document.close();
    win.print();
  }

  deleteAll(index) {
    this.fieldArray.splice(index, 300);
  }

  TipoDeLeilao() {
    return [
      { nome: 'Imóveis', id: 1 },
      { nome: 'Veículos', id: 2 },
      { nome: 'Materiais', id: 3 }
    ]
  }

  validacao() {
    this.relatorioLeilaoForm = this.fb.group({
      nomeDoComitente: [''],
      tipoDeLeilao: [''],
      dataInicial: [''],
      dataFinal: ['']
    });
  }

  pesquisarLeilao() {
    if (this.relatorioLeilaoForm.valid) {
      this.listaDeLeiloes = Object.assign(this.relatorioLeilaoForm.value);
      this.authService.ListarEventoLeilaoPorData(this.listaDeLeiloes).subscribe(
        (dados) => {
          this.pesquisa = dados;
          for (var i = 0, len = this.pesquisa.length; i < len; i++) {
            this.fieldArray.push(dados);
          }
          // this.pesquisaRecebimentoForm.reset();
          // tslint:disable-next-line: no-unused-expression
        }, error => {
        });
    }
  }


}
