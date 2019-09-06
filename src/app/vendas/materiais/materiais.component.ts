import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MaterialService } from 'src/app/_services/material.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-materiais',
  templateUrl: './materiais.component.html',
  styleUrls: ['./materiais.component.css']
})
export class MateriaisComponent implements OnInit {

  material: any;
  cadastrarMaterialForm: FormGroup;
  public fieldArray: Array<any> = [];
  public newAttribute: any = {};
  total: any;
  linhaTabela: any;
  file: Array<FileList>;

  baseUrl = 'https://localhost:44361/api/evento';

  constructor(private authService: MaterialService
    , public fb: FormBuilder
    , public router: Router
    , private toastr: ToastrService) { }

  ngOnInit() {
    this.validation();

    $(function () {
      // We can attach the `fileselect` event to all file inputs on the page
      $(document).on('change', ':file', function () {
        var input = $(this),
          numFiles = input.get(0).files ? input.get(0).files.length : 1,
          label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
        input.trigger('fileselect', [numFiles, label]);
      });

      // We can watch for our custom `fileselect` event like this
      $(document).ready(function () {
        $(':file').on('fileselect', function (event, numFiles, label) {
          var input = $(this).parents('.input-group').find(':text'),
            log = numFiles > 1 ? numFiles + ' files selected' : label;

          if (input.length) {
            input.val(log);
          } else {
            if (log) alert(log);
          }
        });
      });
    });
  }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      this.file = event.target.files;
    }
  }

  addFieldValue() {
    this.fieldArray.push(this.newAttribute)
    this.total = this.newAttribute.valor * this.newAttribute.quantidade;
    this.newAttribute.valorTotal = this.total;
    this.newAttribute = {
    };
  }

  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
  }

  deleteAll(index) {
    this.fieldArray.splice(index, 300);
  }

  validation() {
    this.cadastrarMaterialForm = this.fb.group({
      dataEmissao: [''],
      numeroDaNota: [''],
      descricao: [''],
      valor: [''],
      quantidade: [''],
    });
  }

  cadastrarMaterial() {
    if (this.cadastrarMaterialForm.valid) {
      this.material = this.fieldArray;
      this.authService.CadastrarMaterial(this.material).subscribe(
        () => {
          this.authService.postUpload(this.file).subscribe();
          // const nomeArquivo = this.material.upload.split('\\', 3);
          // this.material.upload = nomeArquivo[2];

          for (let i = 0; i < this.fieldArray.length; i++) {
            this.deleteAll(i);
          }
          this.cadastrarMaterialForm.reset();
        }, error => {
          this.toastr.error('Erro ao cadastrar o evento!');
        }
      );
    }
  }

}
