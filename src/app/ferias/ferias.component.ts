import { Component, OnInit } from '@angular/core';
import { RamalService } from '../_services/ramal.service';
import { MilanxAuthService } from '../_services/milanx-auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as $ from 'jquery';

@Component({
  selector: 'app-ferias',
  templateUrl: './ferias.component.html',
  styleUrls: ['./ferias.component.css']
})
export class FeriasComponent implements OnInit {

  listaDeRamais: any;
  usuario: any;
  jwtHelper = new JwtHelperService();

  constructor(private authService: MilanxAuthService
    , private ramais: RamalService) { }

  ngOnInit() {

    this.listaDeRamais = this.ramais.ListaDeRamais();

    const token = sessionStorage.getItem('token');
    const decodeToken = this.jwtHelper.decodeToken(token);
    this.authService.listarUsuarioPorId(decodeToken.nameid).subscribe((dados) => {
      this.usuario = dados;
    });
  }

  CalcularDiasDeFerias() {
    let date1 = (<any>$("#dataInicio")[0].value);

    date1 = date1.replace(/^(\d+)(?!.*\d)/, "$&\n");
    
    let date2 = (<any>$("#dataFim")[0].value);



    var timeDiff = Math.abs(date2 - date1);
    alert(timeDiff);
  }


}
