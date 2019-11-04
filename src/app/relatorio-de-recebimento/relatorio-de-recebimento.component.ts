import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RecebimentoService } from '../_services/recebimento.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MilanxAuthService } from '../_services/milanx-auth.service';

@Component({
  selector: 'app-relatorio-de-recebimento',
  templateUrl: './relatorio-de-recebimento.component.html',
  styleUrls: ['./relatorio-de-recebimento.component.css']
})
export class RelatorioDeRecebimentoComponent implements OnInit {

  Users: any;
  pesquisaRecebimentoForm: FormGroup;
  listaDeRecebimentos: any;
  fieldArray: Array<any> = [];
  pesquisa: any;

  constructor(public authService: MilanxAuthService
    , public router: Router
    , public fb: FormBuilder
    , private toastr: ToastrService
    , private recebimentoService: RecebimentoService) { }

  ngOnInit() {
    this.validacao();

    this.authService.GetUsers().subscribe((dados) => {
      this.Users = dados;
    });
  }

  validacao() {
    this.pesquisaRecebimentoForm = this.fb.group({
      data: [''],
      userId: ['']
    });
  }

  deleteAll(index) {
    this.fieldArray.splice(index, 300);
  }

  pesquisarRecebimentos() {
    if (this.pesquisaRecebimentoForm.valid) {
      this.listaDeRecebimentos = Object.assign(this.pesquisaRecebimentoForm.value);
      this.recebimentoService.ListarRecebimentosPorData(this.listaDeRecebimentos).subscribe(
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
