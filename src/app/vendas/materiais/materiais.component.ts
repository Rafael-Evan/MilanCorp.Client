import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MaterialService } from 'src/app/_services/material.service';
import { ToastrService } from 'ngx-toastr';
import { FileUpload } from 'src/app/_models/FileUpload';
// import Swal from '/sweetalert2';
import { Location } from '@angular/common';
import { MilanxAuthService } from 'src/app/_services/milanx-auth.service';
import { UploadService } from 'src/app/_services/upload.service';


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
  userName: String;
  roleId: any;
  ListaDeUploads: any;


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
      } else {
        this.i++;
        this.fileUp[i] = files.item(0);
        this.fileUp[i].input = input + '.pdf';
      }
    }
  }

  constructor(private authService: MaterialService
    , public fb: FormBuilder
    , public router: Router
    , private toastr: ToastrService
    , private location: Location
    , private authServiceX: MilanxAuthService
    , private uploadService: UploadService) { }

  ngOnInit() {
    this.validacao();
    this.VerificarTipoDeUsuario();
    this.ListarUploads();
  }

  // tslint:disable-next-line: member-ordering
  formCadastrarMateriais = new FormGroup({
    DataDaEmissao: new FormControl(),
    NumeroNF: new FormControl(),
    DescricaoDoItem: new FormControl(),
    Valor: new FormControl(),
    Quantidade: new FormControl(),
    ValorTotal: new FormControl(),
  });

  formInputs = new FormGroup({
    fileNF: new FormControl(),
    fileTermo: new FormControl(),
  });

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

  validacao() {
    this.cadastrarMaterialForm = this.fb.group({
      dataEmissao: [''],
      numeroDaNota: [''],
      descricao: [''],
      valor: [''],
      quantidade: [''],
    });
  }

  ListarUploads() {
    this.uploadService.ListarUploads().subscribe(
      (data => {
        // tslint:disable-next-line: no-unused-expression
        this.ListaDeUploads = data;
      })
      , error => {
        console.log('Erro ao carregar a lista de materiais!');
      }
    );
  }

  VerificarTipoDeUsuario() {
    this.userName = sessionStorage.getItem('username');

    this.authServiceX.listarUsuarioPeloUserName(this.userName).subscribe(
      (data => {
        this.roleId = data[0][0].roleId;
      }), error => {
        console.log('Erro ao verificar o tipo de usuario!');
      }
    );
  }

  cadastrarMaterial() {
    if (this.cadastrarMaterialForm.valid) {
      this.material = this.fieldArray;
      this.NomeDaPasta = 'Materiais';
      this.userName = sessionStorage.getItem('username');
      this.authServiceX.listarIdDoUsuario(this.userName).subscribe(
        dataUserName => {
          this.authService.postFile(this.fileUp, this.NomeDaPasta).subscribe(
            // this.authService.CadastrarMaterial(this.material).subscribe(
            (data => {
              this.formInputs.reset();
              this.material.forEach(element => {
                element.UploadId = data;
                element.UserId = dataUserName;
              });
              this.authService.CadastrarMaterial(this.material).subscribe(() => {
              //   Swal.fire(
              //     'Finalizado!',
              //     'Venda finalizada com sucesso :)',
              //     'success'
              //   );
              //   location.reload();
              // }, error => {
              //   Swal.fire(
              //     'Cancelado!',
              //     'Ocorreu um erro ao cadastrar a venda :(',
              //     'error'
              //   ).finally(() => {
              //     location.reload();
              //   });
              });
              for (let i = 0; i < this.fieldArray.length; i++) {
                this.deleteAll(i);
              }
              this.cadastrarMaterialForm.reset();
            }), error => {
              this.toastr.error('Erro ao cadastrar o evento!');
            }
          );
        });
    }
  }

}
