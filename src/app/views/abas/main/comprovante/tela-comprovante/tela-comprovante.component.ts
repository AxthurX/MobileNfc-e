import { Component, OnInit, ViewChild } from '@angular/core';
import { CepService, RetornoEndereco } from 'src/app/core/service/cep.service';
import { Util } from 'src/app/core/util.model';
import { Router } from '@angular/router';
import { Subscription, fromEvent } from 'rxjs';
import {
  ActionSheetButton,
  ActionSheetController,
  ModalController,
} from '@ionic/angular';
import { AuthService } from 'src/app/core/service/auth.service';
import { Comprovante, Pecas } from '../comprovante.model';
import { DetalheComprovanteComponent } from '../detalhe-comprovante/detalhe-comprovante.component';

@Component({
  selector: 'app-tela-comprovante',
  templateUrl: './tela-comprovante.component.html',
  styleUrls: ['./tela-comprovante.component.scss'],
})
export class TelaComprovanteComponent implements OnInit {
  private backbuttonSubscription: Subscription;
  @ViewChild('btnVoltar') btnVoltar: any;
  comprovante = new Comprovante();
  comprovantes: Comprovante[] = [];
  pecas: Pecas[] = [];
  carregando: boolean;
  submitted: boolean;
  consultandoEndereco: boolean;
  enderecoConsultado: RetornoEndereco;
  base64: string;
  constructor(
    private utilSrv: CepService,
    private rota: Router,
    public modal: ModalController,
    private actionSheetController: ActionSheetController,
    public auth: AuthService
  ) {
    this.submitted = false;
    this.consultandoEndereco = false;
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

  ajustarQuantidade(registro: Comprovante, incremento: number) {
    if (!registro.numero_ordem_servico) {
      registro.numero_ordem_servico = 0;
    }
    registro.numero_ordem_servico += incremento;
    if (registro.numero_ordem_servico <= -1) {
      registro.numero_ordem_servico = null;
      return;
    }
  }

  alterouQuantidadeManualmente(registro: Comprovante, novoValor) {
    registro.numero_ordem_servico = novoValor;
    if (registro.numero_ordem_servico && registro.numero_ordem_servico < 0) {
      registro.numero_ordem_servico = 1;
    }
  }

  setFocusDocumento() {
    try {
      setTimeout(() => {
        document.getElementById('nome')?.focus();
      }, 500);
    } catch (e) {
      console.error('setFocusDocumento', e);
    }
  }

  async removerNovaPeca(i: number) {
    try {
      if (!this.comprovante.pecas) {
        this.comprovante.pecas = [];
      }

      await Util.Confirmar(`Deseja excluir essa peça`).then((res) => {
        if (res.isConfirmed) {
          this.comprovante.pecas.splice(i, 1);
        }
      });
    } catch (e) {
      Util.TratarErro(e);
    }
  }

  addNovaPeca() {
    try {
      if (!this.comprovante.pecas) {
        this.comprovante.pecas = [];
      }

      this.comprovante.pecas.push({
        descricao: '',
        unidade: 0,
        preco_unitario: 0,
        quantidade: 0,
        preco: 0,
      });
    } catch (e) {
      Util.TratarErro(e);
    }
  }

  onConsutarCEP(comprovante) {
    try {
      if (comprovante.cep && comprovante.cep.length === 8 && navigator.onLine) {
        this.consultandoEndereco = true;
        this.utilSrv.consultaCEP(comprovante.cep).subscribe({
          next: (endereco) => {
            this.enderecoConsultado = endereco;
            if (endereco.erro) {
              Util.AlertWarning(
                'CEP não localizado, verifique se está correto!'
              );
              this.consultandoEndereco = false;
            } else {
              comprovante.complemento = endereco.complemento;
              comprovante.logradouro = endereco.logradouro;
              comprovante.bairro = endereco.bairro;
              comprovante.uf = endereco.uf;
              comprovante.municipio = endereco.localidade;

              this.consultandoEndereco = false;
            }
          },
        }),
          (e: any) => {
            Util.TratarErro(e);
            this.consultandoEndereco = false;
          };
      }
    } catch (e) {
      Util.TratarErro(e);
      this.consultandoEndereco = false;
    }
  }

  async mostrarOpcoesComprovante(comprovante: Comprovante) {
    const buttons: ActionSheetButton[] = [];
    buttons.push({
      text: 'Imprimir',
      icon: 'reader-outline',
      handler: async () => {
        this.OnSalvar(comprovante);
      },
    });

    buttons.push({
      text: 'Reabrir',
      icon: 'pencil',
      handler: () => {
        this.AbrirTelaComprovante();
      },
    });

    buttons.push({
      text: 'Cancelar',
      icon: 'trash',
      handler: () => {
        Util.confirm('Cancelar comprovante', async () => {
          this.rota.navigate(['home/comprovante']);
        });
      },
    });

    buttons.push({
      text: 'Voltar',
      icon: 'close',
      role: 'cancel',
    });

    const actionSheet = await this.actionSheetController.create({
      header: 'Opções do comprovante',
      mode: 'ios',
      buttons,
    });
    await actionSheet.present();
  }

  AbrirTelaComprovante() {
    this.rota.navigate(['home/comprovante/tela-comprovante']);
  }

  AbrirTelaDetalhe() {
    this.rota.navigate(['home/comprovante/detalhe-comprovante']);
  }

  AbrirTelaOrçamento() {
    this.rota.navigate(['home/comprovante/orcamento']);
  }

  async OnSalvar(comprovante: Comprovante) {
    try {
      if (!comprovante.municipio) {
        Util.AlertInfo('Selecione o município');
        this.carregando = false;
        return;
      }

      if (!comprovante.bairro) {
        Util.AlertWarning('Selecione o bairro');
        this.carregando = false;
        return;
      }

      if (
        !comprovante.nome ||
        !comprovante.cep ||
        !comprovante.telefone ||
        !comprovante.observacao_info
      ) {
        Util.AlertWarning('Ops, corrija os campos inválidos');
        this.carregando = false;
        return;
      }

      if (!comprovante.periodo_garantia || !comprovante.condicoes_garantia) {
        Util.AlertWarning('Corrija os campos de garantia e tente novamente!');
        this.carregando = false;
        return;
      }

      // if (comprovante.pecas.length < 1) {
      //    Util.AlertWarning('Selecione pelos menos uma peça!');
      //    this.carregando = false;
      //    return;
      //  }

      const modal = await this.modal.create({
        component: DetalheComprovanteComponent,
        componentProps: { comprovante },
      });
      await modal.present();
    } catch (e) {
      this.modal.dismiss();
    }
  }
}
