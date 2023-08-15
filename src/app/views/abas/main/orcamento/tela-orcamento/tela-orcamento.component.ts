import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { Orcamento } from '../orcamento.model';
import { Router } from '@angular/router';
import {
  ActionSheetButton,
  ActionSheetController,
  ModalController,
} from '@ionic/angular';
import { AuthService } from 'src/app/core/service/auth.service';
import { Util } from 'src/app/core/util.model';
import { DetalheOrcamentoComponent } from '../detalhe-orcamento/detalhe-orcamento.component';

@Component({
  selector: 'app-tela-orcamento',
  templateUrl: './tela-orcamento.component.html',
  styleUrls: ['./tela-orcamento.component.scss'],
})
export class TelaOrcamentoComponent implements OnInit {
  private backbuttonSubscription: Subscription;
  @ViewChild('btnVoltar') btnVoltar: any;
  orcamento = new Orcamento();
  orcamentos: Orcamento[] = [];
  carregando: boolean;
  submitted: boolean;
  base64: string;
  constructor(
    private rota: Router,
    public modal: ModalController,
    private actionSheetController: ActionSheetController,
    public auth: AuthService
  ) {
    this.submitted = false;
  }

  ngOnDestroy() {
    this.backbuttonSubscription.unsubscribe();
  }

  ngOnInit() {
    try {
      const event = fromEvent(document, 'backbutton');
      this.backbuttonSubscription = event.subscribe(async () => {
        try {
          this.btnVoltar.voltar();
        } catch {}
      });
    } catch (e) {
      Util.TratarErro(e);
      this.carregando = false;
    }
  }

  setFocusDocumento() {
    try {
      setTimeout(() => {
        document.getElementById('contratante')?.focus();
      }, 500);
    } catch (e) {
      console.error('setFocusDocumento', e);
    }
  }

  async removerNovoServico(i: number) {
    try {
      if (!this.orcamento.servico) {
        this.orcamento.servico = [];
      }

      await Util.Confirmar(`Deseja excluir esse serviço`).then((res) => {
        if (res.isConfirmed) {
          this.orcamento.servico.splice(i, 1);
        }
      });
    } catch (e) {
      Util.TratarErro(e);
    }
  }

  addNovoServico() {
    try {
      if (!this.orcamento.servico) {
        this.orcamento.servico = [];
      }

      this.orcamento.servico.push({
        descricao_produto: '',
        descricao_servico: '',
        quantidade: 0,
        valor_unitario: 0,
      });
    } catch (e) {
      Util.TratarErro(e);
    }
  }

  async mostrarOpcoesOrcamento(orcamento: Orcamento) {
    const buttons: ActionSheetButton[] = [];
    buttons.push({
      text: 'Imprimir',
      icon: 'reader-outline',
      handler: async () => {
        this.OnSalvar(orcamento);
      },
    });

    buttons.push({
      text: 'Reabrir',
      icon: 'pencil',
      handler: () => {
        this.AbrirTelaOrcamento();
      },
    });

    buttons.push({
      text: 'Cancelar',
      icon: 'trash',
      handler: () => {
        Util.confirm('Cancelar orcamento', async () => {
          this.rota.navigate(['home/orcamento']);
        });
      },
    });

    buttons.push({
      text: 'Voltar',
      icon: 'close',
      role: 'cancel',
    });

    const actionSheet = await this.actionSheetController.create({
      header: 'Opções do orçamento',
      mode: 'ios',
      buttons,
    });
    await actionSheet.present();
  }

  AbrirTelaOrcamento() {
    this.rota.navigate(['home/orcamento/tela-orcamento']);
  }

  AbrirTelaDetalhe() {
    this.rota.navigate(['home/orcamento/detalhe-orcamento']);
  }

  async OnSalvar(orcamento: Orcamento) {
    try {
      const modal = await this.modal.create({
        component: DetalheOrcamentoComponent,
        componentProps: { orcamento },
      });
      await modal.present();
    } catch (e) {
      this.modal.dismiss();
    }
  }
}
