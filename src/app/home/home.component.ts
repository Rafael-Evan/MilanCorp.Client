import { Component, OnInit, Injectable } from '@angular/core';
import { EventoService } from '../_services/evento.service';
import { ReuniaoService } from '../_services/reuniao.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotificacaoService } from '../_services/notificacao.service';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FeriasService } from '../_services/ferias.service';
import { RecebimentoService } from '../_services/recebimento.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  jwtHelper = new JwtHelperService();
  editarEventoCorpForm: FormGroup;
  notificacao: any;
  notificacaoForm: FormGroup;
  expira: any;
  ListarNotificacoes: any;
  ListarSolicitacoesDeFerias: any;
  eventoLeilao: any;
  editarForm: any;
  MinhasSolicitacoesDeFerias: any;
  MeusRecebimentos: any;

  constructor(private EventoService: EventoService
    , private ReuniaoService: ReuniaoService
    , public fb: FormBuilder
    , private NotificacaoService: NotificacaoService
    , private toastr: ToastrService
    , private FeriasService: FeriasService
    , private recebimentoService: RecebimentoService) { }

  ngOnInit() {
    this.editarForm = {};

    this.EventoService.Eventos();

    this.ListarAlertas();

    this.MinhaSolicitacaoDeFerias();

    this.ListarMeusRecebimentos();

    this.ListarSolicitacaoDeFerias();

    this.expira = this.NotificacaoService.ExpiraEm();

    this.validacao();

    function readCookie(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    }
    var widget = document.getElementById('c_c4a3830e198f4858adb591fac0589426');
    var url_suffix = '';

    if (widget) {
      widget.style.cssText = 'border:1px solid #bdbdbd;width:144resolvpx;height:230px;background:#ffffff;overflow:hidden;-moz-border-radius:;-webkit-border-radius:;-o-border-radius:;-ms-border-radius:;border-radius:;';
      widget.innerHTML = '<iframe id="fr_c4a3830e198f4858adb591fac0589426" src="https://www.otempo.pt/widget/get_widget/c4a3830e198f4858adb591fac0589426' + '?v=11000" frameborder="0" scrolling="no" width="100%" height="100%" allowTransparency="true" style="overflow: hidden;"></iframe>';
    }
  }

  AtualizarStatusDosMeusRecebimentos(id: any, status: any) {
    this.recebimentoService.AtualizarStatusDoRecebio(id, status).subscribe(
      data => {
        this.toastr.success('Correspondência recebida!');
        setTimeout(function() {
          window.location.reload(true);
        }, 2000);
      }, error => {
        this.toastr.error('Erro ao receber a correspondência!');
        setTimeout(function() {
          window.location.reload(true);
        }, 2000);
      });
  }

  AtualizarSolicitacaoDeFerias(id: any, status: any) {
    this.FeriasService.AtualizarStatusDaSolicitacao(id, status).subscribe(
      data => {
        this.toastr.success('Pedido de férias aprovado!');
        setTimeout(function() {
          window.location.reload(true);
        }, 2000);
      }, error => {
        this.toastr.error('Pedido de férias recusado!');
        setTimeout(function() {
          window.location.reload(true);
        }, 2000);
      });
  }


  editar(frm: FormGroup) {
    this.editarForm.id = (<any>$("#leilao #id")[0].innerText);
    this.editarForm.title = (<any>$("#leilao #title")[0].value);
    this.editarForm.start = (<any>$("#leilao #start")[0].value);
    this.editarForm.nomeDoComitente = (<any>$("#leilao #nomeDoComitente")[0].value);
    this.editarForm.tipoDeLeilao = (<any>$("#leilao #tipoDeLeilao")[0].value);
    this.editarForm.endereco = (<any>$("#leilao #endereco")[0].value);
    this.editarForm.observacao = (<any>$("#leilao #observacao")[0].value);

    this.EventoService.EditarEvento(this.editarForm.id, this.editarForm).subscribe(resposta => {
      this.editarForm.push(resposta);
      this.toastr.success('Leilão atualizado com sucesso!');
      frm.reset();
    }, error => {
      this.toastr.error('Erro ao atualizar o leilão!');
    });
  }

  MinhaSolicitacaoDeFerias() {
    const token = sessionStorage.getItem('token');
    const decodeToken = this.jwtHelper.decodeToken(token);
    this.FeriasService.MinhaSolicitacaoDeFerias(decodeToken.nameid).subscribe(
      (data => {
        // tslint:disable-next-line: no-unused-expression
        this.MinhasSolicitacoesDeFerias = data;
      })
      , error => {
        console.log('Você não tem solicitação de ferias!');
      }
    );
  }

  ListarMeusRecebimentos() {
    const token = sessionStorage.getItem('token');
    const decodeToken = this.jwtHelper.decodeToken(token);
    this.recebimentoService.ListarMeusRecebimentos(decodeToken.nameid).subscribe(
      (data => {
        // tslint:disable-next-line: no-unused-expression
        this.MeusRecebimentos = data;
      })
      , error => {
        console.log('Você não tem recebimentos de correspondência!');
      }
    );
  }


  VerificarPermissaoDeExcluirReuniao() {
    const token = sessionStorage.getItem('token');
    const decodeToken = this.jwtHelper.decodeToken(token);
    const userId = (<any>$("#reuniao #userId")[0].innerText);

    if (userId == decodeToken.nameid) {
      return true
    }
    else {
      return false;
    }
  }

  cancelarLeilao(id: any) {
    id = (<any>$("#leilao #id")[0].innerText);
    this.EventoService.CancelarEvento(id).subscribe(
      () => {
        this.toastr.success('Leilão excluído com sucesso!');
        window.location.reload();
      }, error => {
        this.toastr.error('Erro ao excluído o leilão!');
      });
  }

  excluirReuniao(id: any) {
    id = (<any>$("#reuniao #id")[0].value);
    this.ReuniaoService.ExcluirReuniao(id).subscribe(
      () => {
        this.toastr.success('Reunião excluída com sucesso!');
        window.location.reload();
      }, error => {
        this.toastr.error('Erro ao Reunião a leilão!');
      });
  }

  slideFormexcluirLeilao() {
    $('.excluirEvento').slideToggle();
    $('.visevent').slideToggle();
  }

  slideFormexcluirReuniao() {
    $('.excluirReuniao').slideToggle();
    $('.esconderRenuiao').slideToggle();
  }

  slideFormEditLeilao() {
    $('.formedit').slideToggle();
    $('.visevent').slideToggle();
  }

  ListarSolicitacaoDeFerias() {
    this.FeriasService.ListarSolicitacaoDeFerias().subscribe(
      (data => {
        // tslint:disable-next-line: no-unused-expression
        this.ListarSolicitacoesDeFerias = data;
      })
      , error => {
        console.log('Erro ao carregar a lista de solicitações de férias!');
      }
    );
  }

  ListarAlertas() {
    this.NotificacaoService.ListarNotificacoes().subscribe(
      (data => {
        // tslint:disable-next-line: no-unused-expression
        this.ListarNotificacoes = data;
      })
      , error => {
        console.log('Erro ao carregar a lista de alertas!');
      }
    );
  }

  validacao() {
    this.notificacaoForm = this.fb.group({
      assunto: [''],
      DataDaSolicitacao: [''],
      Expirar: ['']
    });

    this.editarEventoCorpForm = this.fb.group({
      id: [''],
      title: [''],
      start: [''],
      nomeDoComitente: [''],
      tipoDeLeilao: [''],
    });
  }

  cadastrarSolicitacao() {
    if (this.notificacaoForm.valid) {
      this.notificacao = Object.assign(this.notificacaoForm.value);
      this.NotificacaoService.CadastrarNotificacao(this.notificacao).subscribe(
        () => {
          this.notificacaoForm.reset();
          this.toastr.success('Solicitação cadastrada com sucesso!');
        }, error => {
          this.toastr.error('Erro ao cadastrar a solicitação!');
        }
      );
    }
  }

  userRole() {
    const token = sessionStorage.getItem('token');
    const decodeToken = this.jwtHelper.decodeToken(token);
    return decodeToken.role;
  }

}
