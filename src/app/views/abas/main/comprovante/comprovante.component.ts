import { Component, OnInit } from '@angular/core';
import { Util } from 'src/app/core/util.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DadosEmpresa } from 'src/app/core/service/auth.service';
import {
  ActionSheetButton,
  ActionSheetController,
  ModalController,
} from '@ionic/angular';
import { DetalheComprovanteComponent } from './detalhe-comprovante/detalhe-comprovante.component';
import { Comprovante } from './comprovante.model';

@Component({
  selector: 'app-comprovante',
  templateUrl: './comprovante.component.html',
  styleUrls: ['./comprovante.component.scss'],
})
export class ComprovanteComponent implements OnInit {
  abaSelecionada: string;
  consultando: boolean;
  sincronizando: boolean;
  ultimaVenda: number;
  dadosEmpresaLogada: DadosEmpresa;
  constructor(
    private actionSheetController: ActionSheetController,
    private modal: ModalController,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.abaSelecionada = 'pendentes';
    this.consultando = false;
    this.sincronizando = false;
  }

  doRefresh(event: any) {
    setTimeout(() => {
      event.target.complete();
    }, 100);
  }

  async ngOnInit() {}

  segmentChanged(ev: any) {
    this.abaSelecionada = ev.detail.value;
  }

  async sincronizarTudo() {
    // try {
    //   this.sincronizando = true;
    //   const sincronizar = this.pendentes.filter(
    //     (c) => !c.dados_json.status_manipulacao
    //   );
    //   if (sincronizar.length > 0) {
    //     for (let i = 0; i < sincronizar.length; i++) {
    //       await this.sincronizarcomprovante(sincronizar[i], i, true);
    //     }
    //     this.OnConsultar();
    //   } else {
    //     Util.AlertInfo('Nenhum BALANÇO pendente foi localizado');
    //   }
    // } catch (e) {
    //   Util.TratarErro(e);
    // }
    // this.sincronizando = false;
  }

  AbrirTelaComprovante(
    objComprovante?: Comprovante,
    copiando?: boolean
  ) {
    let id_comprovante: number | undefined;
    let acao = 'novo';
    if (objComprovante) {
      if (copiando === true) {
        acao = 'copiando';
      } else {
        acao = 'editando';
      }
    }

    this.router.navigate([
      'home/comprovante/tela-comprovante',
      { id_comprovante, acao },
    ]);
  }
}
