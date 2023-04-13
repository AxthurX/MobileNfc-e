import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DadosEmpresa } from 'src/app/core/service/auth.service';
import { Comprovante } from './comprovante.model';

@Component({
  selector: 'app-comprovante',
  templateUrl: './comprovante.component.html',
  styleUrls: ['./comprovante.component.scss'],
})
export class ComprovanteComponent {
  consultando: boolean;
  dadosEmpresaLogada: DadosEmpresa;
  constructor(private rota: Router) {
    this.consultando = false;
  }

  doRefresh(event: any) {
    setTimeout(() => {
      event.target.complete();
    }, 100);
  }

  AbrirTelaComprovante(objComprovante?: Comprovante, copiando?: boolean) {
    let acao = 'novo';
    if (objComprovante) {
      if (copiando === true) {
        acao = 'copiando';
      } else {
        acao = 'editando';
      }
    }

    this.rota.navigate(['home/comprovante/tela-comprovante', { acao }]);
  }
}
