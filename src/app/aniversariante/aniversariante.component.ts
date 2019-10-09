import { Component, OnInit } from '@angular/core';
import { AniversarianteService } from '../_services/aniversariante.service';
import * as $ from 'jquery';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-aniversariante',
  templateUrl: './aniversariante.component.html',
  styleUrls: ['./aniversariante.component.css']
})
export class AniversarianteComponent implements OnInit {

  cadastrarAniversarianteForm: FormGroup;
  cadastrarAniversarianteListForm: FormGroup;
  fileToUpload: File = null;
  aniversariante: any;

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  constructor(private authService: AniversarianteService
    , public fb: FormBuilder
    , private toastr: ToastrService) { }

  ngOnInit() {
    this.validacao();

    $('.divlista').hide();
    $('.divmanual').hide();

    $('input[id="Lista"]').change(function () {
      if ($("input[id=Lista][value='Sim']").prop("checked", true)) {
        $('.divlista').show();
        $('.divmanual').hide();
      }
    });

    $('input[id="Manual"]').change(function () {
      if ($("input[id=Manual][value='Sim']").prop("checked", true)) {
        $('.divmanual').show();
        $('.divlista').hide();
      }
    });
  }

  validacao() {
    this.cadastrarAniversarianteForm = this.fb.group({
      title: [''],
      start: ['']
    });

    this.cadastrarAniversarianteListForm = this.fb.group({
      arquivo: ['']
    });
  }

  cadastrarAniversariante() {
    if (this.cadastrarAniversarianteForm.valid) {
      this.aniversariante = Object.assign(this.cadastrarAniversarianteForm.value);
      this.authService.CadastrarAniversariante(this.aniversariante).subscribe(
        () => {
          this.cadastrarAniversarianteForm.reset();
          this.toastr.success('Aniversariante cadastro com sucesso!');
        }, error => {
          this.toastr.error('Erro ao cadastrar o aniversariante!');
        }
      );
    }
  }

  AniversariantesUpload() {
    this.authService.ImportarAniversariantes(this.fileToUpload).subscribe(data => {
      // do something, if upload success
      this.cadastrarAniversarianteListForm.reset();
      this.toastr.success('Aniversariante importados com sucesso!');
    }, error => {
      this.toastr.error('Erro ao importar os aniversariantes!');
    });
  }

}
