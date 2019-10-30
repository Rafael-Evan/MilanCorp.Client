import { Component, OnInit } from '@angular/core';
import { RamalService } from '../_services/ramal.service';
import { MilanxAuthService } from '../_services/milanx-auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as $ from 'jquery';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FeriasService } from '../_services/ferias.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ferias',
  templateUrl: './ferias.component.html',
  styleUrls: ['./ferias.component.css']
})
export class FeriasComponent implements OnInit {

  listaDeRamais: any;
  usuario: any;
  jwtHelper = new JwtHelperService();
  totalDiasDeFerias: any;
  solicitacaoDeFeriasForm: FormGroup;
  ferias: any;

  constructor(private authService: MilanxAuthService
    , private ramais: RamalService
    , public fb: FormBuilder
    , private toastr: ToastrService
    , private feriasService: FeriasService) { }

  ngOnInit() {
    this.validacao();
    this.listaDeRamais = this.ramais.ListaDeRamais();

    const token = sessionStorage.getItem('token');
    const decodeToken = this.jwtHelper.decodeToken(token);
    this.authService.listarUsuarioPorId(decodeToken.nameid).subscribe((dados) => {
      this.usuario = dados;
    });
  }

  CalcularDiasDeFerias() {
    let date1 = new Date(<any>$("#dataInicio")[0].value);
    let date2 = new Date(<any>$("#dataFim")[0].value);
    let timeDiff = Math.abs(date2.getTime() - date1.getTime());
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    this.totalDiasDeFerias = diffDays;
  }

  validacao() {
    this.solicitacaoDeFeriasForm = this.fb.group({
      UserId: [''],
      nomeDoFuncionario: [''],
      ramal: [''],
      cargo: [''],
      dataInicio: [''],
      dataFim: [''],
      quantidadeDeDias: [''],
      observacao: ['']
    });
  }

  AdicionarSolicitacaoDeFerias() {
    if (this.solicitacaoDeFeriasForm.valid) {
      const token = sessionStorage.getItem('token');
      const decodeToken = this.jwtHelper.decodeToken(token);
      this.ferias = Object.assign(this.solicitacaoDeFeriasForm.value);
      this.ferias.UserId = decodeToken.nameid;
      this.feriasService.AdicionarSolicitacaoDeFerias(this.ferias).subscribe(
        () => {
          this.solicitacaoDeFeriasForm.reset();
          this.toastr.success('Solicitação de Férias cadastrada com sucesso!');
          // tslint:disable-next-line: no-unused-expression
        }, error => {
          this.toastr.error('Erro ao adicionar uma solicitação de férias!');
        });
    }
  }


}
