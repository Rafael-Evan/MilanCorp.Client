import { Component, OnInit } from '@angular/core';
import { EventoService } from '../_services/evento.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotificacaoService } from '../_services/notificacao.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  notificacao: any;
  notificacaoForm: FormGroup;
  expira: any;

  constructor(private EventoService: EventoService
    , public fb: FormBuilder
    , private NotificacaoService: NotificacaoService
    , private toastr: ToastrService) { }

  ngOnInit() {
    this.EventoService.Eventos();

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

  validacao() {
    this.notificacaoForm = this.fb.group({
      assunto: [''],
      DataDaSolicitacao: [''],
      Expirar: ['']
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

}
