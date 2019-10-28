import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { VendasComponent } from './vendas/vendas.component';
import { AutomovelComponent } from './vendas/automovel/automovel.component';
import { ImoveisComponent } from './vendas/imoveis/imoveis.component';
import { MateriaisComponent } from './vendas/materiais/materiais.component';
import { VendasMenuComponent } from './vendas/vendas-menu/vendas-menu.component';
import { EventoComponent } from './evento/evento.component';
import { AniversarianteComponent } from './aniversariante/aniversariante.component';
import { SalaDeReuniaoComponent } from './sala-de-reuniao/sala-de-reuniao.component';
import { ListaDeRamaisComponent } from './lista-de-ramais/lista-de-ramais.component';
import { FeriasComponent } from './ferias/ferias.component';


const routes: Routes = [
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'login', component: LoginComponent },
    ]
  },
  {
    path: 'vendas', component: VendasComponent,
    children: [
      {path: 'menu', component: VendasMenuComponent},
      {path: 'autos', component: AutomovelComponent},
      {path: 'imoveis', component: ImoveisComponent},
      {path: 'materiais', component: MateriaisComponent}
    ]
  },
  { path: 'home', component: HomeComponent },
  {path: 'evento', component: EventoComponent},
  {path: 'lista-de-ramais-milan', component: ListaDeRamaisComponent},
  {path: 'reuniao', component: SalaDeReuniaoComponent},
  {path: 'aniversariante', component: AniversarianteComponent},
  {path: 'solicitacao-de-ferias', component: FeriasComponent},
  { path: '', redirectTo: 'user/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
