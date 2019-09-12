import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MaterialService } from 'src/app/_services/material.service';
import { ToastrService } from 'ngx-toastr';
import { FileUpload } from 'src/app/_models/FileUpload';

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
  files: File;
  i = 0;
  NomeDaPasta: String;

  fileUp: Array<FileUpload> = [];
  fileToUpload: Array<File> = [];

  handleFileInput(files: FileList, input: any) {
    for (let i = 0; i < files.length; i++) {
      // tslint:disable-next-line: triple-equals
      if (this.i == 1) {
        this.i++;
        i++;
        this.fileUp[i] = files.item(0);
        this.fileUp[i].input = input + '.pdf';
      }else {
        this.i++;
        this.fileUp[i] = files.item(0);
        this.fileUp[i].input = input + '.pdf';
      }
    }
  }

    constructor(private authService: MaterialService
      , public fb: FormBuilder
      , public router: Router
      , private toastr: ToastrService) { }

    ngOnInit() {
      this.validation();
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
        this.NomeDaPasta = 'Materiais';
        this.authService.CadastrarMaterial(this.material).subscribe(
          () => {
            // this.authService.postUpload(this.files[0]).subscribe(
            // );
            this.authService.postFile(this.fileUp, this.NomeDaPasta).subscribe(data => {
              // do something, if upload success
            }, error => {
              console.log(error);
            });

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
