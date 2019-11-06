import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PortasAbertasService } from '../_services/portas-abertas.service';

@Component({
  selector: 'app-portas-abertas',
  templateUrl: './portas-abertas.component.html',
  styleUrls: ['./portas-abertas.component.css']
})
export class PortasAbertasComponent implements OnInit {

  finalidades: any;
  portasAbertasForm: FormGroup;
  mensagem: any;

  constructor(private portasAbertasService: PortasAbertasService
    , public fb: FormBuilder
    , public router: Router
    , private toastr: ToastrService) { }

  ngOnInit() {
    this.validacao();

    this.finalidades = this.portasAbertasService.FinalidadeDaMensagem();
  }

  validacao() {
    this.portasAbertasForm = this.fb.group({
      finalidade: [''],
      mensagem: ['']
    });
  }

  EnviarSugestao() {
    if (this.portasAbertasForm.valid) {
      this.mensagem = Object.assign(this.portasAbertasForm.value);
      this.portasAbertasService.EnviarSugestao(this.mensagem).subscribe(
        () => {
          this.portasAbertasForm.reset();
          this.toastr.success('Mensagem enviada com sucesso!');
          // tslint:disable-next-line: no-unused-expression
        }, error => {
          this.toastr.error('Erro ao enviar a mensagem!');
        });
    }
  }

}
