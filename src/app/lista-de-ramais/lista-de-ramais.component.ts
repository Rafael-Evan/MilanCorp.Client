import { Component, OnInit } from '@angular/core';
import { RamalService } from '../_services/ramal.service';

@Component({
  selector: 'app-lista-de-ramais',
  templateUrl: './lista-de-ramais.component.html',
  styleUrls: ['./lista-de-ramais.component.css']
})
export class ListaDeRamaisComponent implements OnInit {

  listaDeramais: any[];
  colab: string;

  constructor(private ramais: RamalService) { }

  ngOnInit() {
    this.listaDeramais = this.ramais.ListaDeRamais();
  }

  Search() {
    if (this.colab != '') {
      this.listaDeramais = this.listaDeramais.filter(res => {
        return res.colaborador.toLocaleLowerCase().match(this.colab.toLocaleLowerCase());
      })
    } else if (this.colab == '') {
      this.ngOnInit();
    }
  }

}
