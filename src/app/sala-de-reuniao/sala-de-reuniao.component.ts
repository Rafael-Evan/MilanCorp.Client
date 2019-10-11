import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ReuniaoService } from '../_services/reuniao.service';
import { MilanxAuthService } from '../_services/milanx-auth.service';

@Component({
  selector: 'app-sala-de-reuniao',
  templateUrl: './sala-de-reuniao.component.html',
  styleUrls: ['./sala-de-reuniao.component.css']
})
export class SalaDeReuniaoComponent implements OnInit {

  reuniao: any;
  reservarSalaForm: FormGroup;
  Departamentos: any[];
  SalaDeReuniao: any[];
  LocalDaReuniao: any[];
  userName: string;

  constructor(private authService: ReuniaoService
    , public fb: FormBuilder
    , private toastr: ToastrService
    , private authServiceX: MilanxAuthService) { }

  ngOnInit() {
    this.validacao();
    this.authService.ListarReunioes();
    this.Departamentos = this.authService.Departamentos();
    this.SalaDeReuniao = this.authService.SalaDeReuniao();
    this.LocalDaReuniao = this.authService.LocalDaReuniao();
  }

  validacao() {
    this.reservarSalaForm = this.fb.group({
      UserId: [''],
      title: [''],
      departamento: [''],
      sala: [''],
      data: [''],
      local: [''],
      start: ['', ''],
      end: ['']
    });
  }

  AdicionarReuniao() {
    if (this.reservarSalaForm.valid) {
      this.userName = sessionStorage.getItem('username');
      this.reuniao = Object.assign(this.reservarSalaForm.value);
      this.authServiceX.listarIdDoUsuario(this.userName).subscribe(
        userId => {
          this.reuniao.UserId = userId;
        }),
        this.authService.AdicionarReuniao(this.reuniao).subscribe(
          () => {
            this.reservarSalaForm.reset();
            this.toastr.success('Reunião cadastra com sucesso!');
            // tslint:disable-next-line: no-unused-expression
          }, error => {
            this.toastr.error('Já existe uma reunião nessa sala e horário!');
        });
    }
  }

}
