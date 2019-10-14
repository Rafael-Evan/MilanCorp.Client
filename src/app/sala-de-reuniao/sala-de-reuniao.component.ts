import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ReuniaoService } from '../_services/reuniao.service';
import { MilanxAuthService } from '../_services/milanx-auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-sala-de-reuniao',
  templateUrl: './sala-de-reuniao.component.html',
  styleUrls: ['./sala-de-reuniao.component.css']
})
export class SalaDeReuniaoComponent implements OnInit {

  jwtHelper = new JwtHelperService();
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
      const token = sessionStorage.getItem('token');
      const decodeToken = this.jwtHelper.decodeToken(token);
      this.reuniao = Object.assign(this.reservarSalaForm.value);
      this.reuniao.UserId = decodeToken.nameid;
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
