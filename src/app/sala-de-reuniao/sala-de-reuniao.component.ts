import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ReuniaoService } from '../_services/reuniao.service';

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

  constructor(private authService: ReuniaoService
    , public fb: FormBuilder
    , private toastr: ToastrService) { }

  ngOnInit() {
    this.validacao();
    this.Departamentos = this.authService.Departamentos();
    this.SalaDeReuniao = this.authService.SalaDeReuniao();
  }

  validacao() {
    this.reservarSalaForm = this.fb.group({
      title: [''],
      departamento: [''],
      sala: [''],
      data: [''],
      start: ['', ''],
      end: ['']
    });
  }

  AdicionarReuniao() {
    if (this.reservarSalaForm.valid) {
      this.reuniao = Object.assign(this.reservarSalaForm.value);
      this.authService.AdicionarReuniao(this.reuniao).subscribe(
        () => {
          this.reservarSalaForm.reset();
          this.toastr.success('Reunião cadastra com sucesso!');
        }, error => {
          this.toastr.error('Erro ao cadastrar a Reunião!');
        }
      );
    }
  }

}
