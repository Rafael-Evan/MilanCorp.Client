import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MilanxAuthService } from '../_services/milanx-auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RecebimentoService } from '../_services/recebimento.service';

@Component({
  selector: 'app-recebimento',
  templateUrl: './recebimento.component.html',
  styleUrls: ['./recebimento.component.css']
})
export class RecebimentoComponent implements OnInit {

  Users: any;
  recebimentoForm: FormGroup;
  recebidos: any;

  constructor(public authService: MilanxAuthService
    ,         public router: Router
    ,         public fb: FormBuilder
    ,         private toastr: ToastrService
    ,         private recebimentoService: RecebimentoService) { }

  ngOnInit() {

    this.validacao();

    this.authService.GetUsers().subscribe((dados) => {
      this.Users = dados;
    });

  }

  validacao() {
    this.recebimentoForm = this.fb.group({
      userId: [''],
      remetente: [''],
      numeroDeRastreamento: [''],
      quantidade: [''],
      dataDoRecebimento: [''],
      recebidoPor: ['']
    });
  }

  AdicionarSolicitacaoDeFerias() {
    if (this.recebimentoForm.valid) {
      this.recebidos = Object.assign(this.recebimentoForm.value);
      this.recebimentoService.AdicionarRecebimentoDeCorrespondencia(this.recebidos).subscribe(
        () => {
          this.recebimentoForm.reset();
          this.toastr.success('Correspondência cadastrada com sucesso!');
          // tslint:disable-next-line: no-unused-expression
        }, error => {
          this.toastr.error('Erro ao adicionar uma correspondência!');
        });
    }
  }


}
