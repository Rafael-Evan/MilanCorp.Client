import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RamalService {

  constructor() { }

  ListaDeRamais() {
    return [
      { colaborador: 'Recepção Milan 1º', ramal: '0090' },
      { colaborador: 'Recepção Milan 2º', ramal: '0070' },
      { colaborador: 'Recepção Pátio', ramal: '0057' },
      { colaborador: 'Leandro Fernandes', ramal: '0058' },
      { colaborador: 'Michel Santana', ramal: '0059' },
      { colaborador: 'Karen Vilhena', ramal: '0060' },
      { colaborador: 'Cobrança KM20', ramal: '0061' },
      { colaborador: 'Gian Morais', ramal: '0062' },
      { colaborador: 'Flávia Peixinho', ramal: '0210' },
      { colaborador: 'Leticia Trindade', ramal: '0110' },
      { colaborador: 'Sala de Reunião', ramal: '0111' },
      { colaborador: 'Fernando', ramal: '0218' },
      { colaborador: 'Ester Cabral', ramal: '	0133' },
      { colaborador: 'Evana Campos', ramal: '0134' },
      { colaborador: 'Carlos Castro', ramal: '0109' },
      { colaborador: 'João Carlos', ramal: '0235' },
      { colaborador: 'Neide ', ramal: '0135' },
      { colaborador: 'Malu', ramal: '0116' },
      { colaborador: 'Bruno Milan', ramal: '0112' },
      { colaborador: 'Alex Milan', ramal: '0113' },
      { colaborador: 'Ronaldo Milan', ramal: '0114' },
      { colaborador: 'Rafael Milan', ramal: '0222' },
      { colaborador: 'Gustavo Milan', ramal: '0246' },
      { colaborador: 'Luis Piva', ramal: '0143' },
      { colaborador: 'Edvaldo ', ramal: '0104' },
      { colaborador: 'Felipe Martins/Isabelly', ramal: '0254' },
      { colaborador: 'Felipe/Danilo', ramal: '0117' },
      { colaborador: 'Camila', ramal: '0149' },
      { colaborador: 'Jane Barreiros', ramal: '0137' },
      { colaborador: 'Lucas Matheus', ramal: '0107' },
      { colaborador: 'Wagner/Grasiela', ramal: '0124' },
      { colaborador: 'Mirelle/William', ramal: '0106' },
      { colaborador: 'José W. Carneiro', ramal: '0140' },
      { colaborador: 'Eduardo Raposo', ramal: '0223' },
      { colaborador: 'Marco Assis / William Rocha', ramal: '0242' },
      { colaborador: 'Luiz Oliveira ', ramal: '0138' },
      { colaborador: 'Silvio Luiz', ramal: '0123' },
      { colaborador: 'Márcio Moço ', ramal: '0148' },
      { colaborador: 'Fabio Laranja', ramal: '0118' },
      { colaborador: 'Bruno Silva ', ramal: '0255' },
      { colaborador: 'Ronaldo Biagini	', ramal: '	0146' },
      { colaborador: 'Copa', ramal: '	0217' },
      { colaborador: 'Dino', ramal: '0220' }
    ]
  }

}
