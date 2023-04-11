import { Component, OnInit } from '@angular/core';
import { Util } from 'src/app/core/util.model';
import { ActivatedRoute, Router } from '@angular/router';
import { OperacaoComprovante } from '../../../../core/operacao-comprovante.model';
import { AuthService, DadosEmpresa } from 'src/app/core/service/auth.service';
import { ActionSheetButton, ActionSheetController, ModalController } from '@ionic/angular';
import { OverlayService } from 'src/app/core/service/overlay.service';
import { DetalheComprovanteComponent } from './detalhe-comprovante/detalhe-comprovante.component';

@Component({
  selector: 'app-comprovante',
  templateUrl: './comprovante.component.html',
  styleUrls: ['./comprovante.component.scss'],
})
export class ComprovanteComponent implements OnInit {
  abaSelecionada: string;
  consultando: boolean;
  sincronizando: boolean;
  pendentes: OperacaoComprovante[];
  sincronizados: OperacaoComprovante[];
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
    this.pendentes = [];
    this.sincronizados = [];
  }
  doRefresh(event: any) {
    setTimeout(() => {
      event.target.complete();
      this.OnConsultar();
    }, 100);
  }

  async ngOnInit() {
    this.OnConsultar();
  }

  async OnConsultar() {
  }

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

  async mostrarOpcoesComprovante(comprovante: OperacaoComprovante, index: number) {
    const buttons: ActionSheetButton[] = [];
    buttons.push({
      text: 'Copiar',
      icon: 'copy',
      handler: () => {
        this.AbrirTelaComprovante(comprovante, true);
      },
    });

    buttons.push({
      text: 'Detalhes',
      icon: 'reader-outline',
      handler: async () => {
        const modal = await this.modal.create({
          component: DetalheComprovanteComponent,
          componentProps: {
            comprovante,
          },
        });

        await modal.present();
      },
    });

    //nao ta sincronizado
    if (!comprovante.id_nuvem) {
      buttons.push({
        text: 'Reabrir',
        icon: 'pencil',
        handler: () => {
          this.AbrirTelaComprovante(comprovante);
        },
      });
      buttons.push({
        text: 'Sincronizar',
        icon: 'sync',
        handler: async () => {
          if (!comprovante.dados_json.status_manipulacao) {
            console.log('a')
          } else {
            Util.confirm(
              'Não é possível sincronizar COMPROVANTE, deseja reabrir a comprovante para alterá-la?',
              () => {
                this.AbrirTelaComprovante(comprovante);
              }
            );
          }
        },
      });

      buttons.push({
        text: 'Cancelar',
        icon: 'trash',
        handler: () => {
          Util.confirm('Excluindo comprovante', async () => {

          });
        },
      });
    }

    buttons.push({
      text: 'Voltar',
      icon: 'close',
      role: 'cancel',
    });

    const actionSheet = await this.actionSheetController.create({
      header: 'Opções do balanço',
      mode: 'ios',
      buttons,
    });
    await actionSheet.present();
  }


  AbrirTelaComprovante(objComprovante?: OperacaoComprovante, copiando?: boolean) {
    let id_comprovante: number | undefined;
    let acao = 'novo';
    if (objComprovante) {
      id_comprovante = objComprovante.id;
      if (copiando === true) {
        acao = 'copiando';
      } else {
        acao = 'editando';
      }
    }

    this.router.navigate(['home/comprovante/tela-comprovante', { id_comprovante, acao }]);
  }

  AbrirTelaDetalhe(objComprovante?: OperacaoComprovante, copiando?: boolean) {
    let id_comprovante: number | undefined;
    let acao = 'novo';
    if (objComprovante) {
      id_comprovante = objComprovante.id;
      if (copiando === true) {
        acao = 'copiando';
      } else {
        acao = 'editando';
      }
    }

    this.router.navigate(['home/comprovante/detalhe-comprovante', { id_comprovante, acao }]);
  }
}
