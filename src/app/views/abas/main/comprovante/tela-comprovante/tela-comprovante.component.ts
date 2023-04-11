import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CepService, RetornoEndereco } from 'src/app/core/service/cep.service';
import { Util } from 'src/app/core/util.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OperacaoComprovante } from '../../../../../core/operacao-comprovante.model';
import { Subscription, fromEvent } from 'rxjs';
import { ActionSheetButton, ActionSheetController, ModalController } from '@ionic/angular';
import { OverlayService } from 'src/app/core/service/overlay.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { OperacaoComprovanteUtil } from '../../../../../core/operacao-comprovante-util.model';
import { Comprovante } from '../comprovante.model';
import { DetalheComprovanteComponent } from '../detalhe-comprovante/detalhe-comprovante.component';

@Component({
  selector: 'app-tela-comprovante',
  templateUrl: './tela-comprovante.component.html',
  styleUrls: ['./tela-comprovante.component.scss'],
})
export class TelaComprovanteComponent implements OnInit {
  private backbuttonSubscription: Subscription;
  @ViewChild('btnVoltar') btnVoltar: any;
  @Input() objComprovante: OperacaoComprovante;
  @Input() copiando?: boolean;
  aba_selecionada: string;
  carregando: boolean;
  observacao: string;
  acao: string;
  cliente: FormGroup;
  submitted: boolean;
  cadastrando_bairro: boolean;
  bairro_descricao: string;
  validando_documento: boolean;
  comprovante: Comprovante;
  nome: string;
  email: string;
  cpf_cnpj: string;
  telefone: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  uf: string;
  municipio: string;
  consultandoEndereco: boolean;
  enderecoConsultado: RetornoEndereco;
  consultando: boolean;
  base64: string;

  constructor(
    private utilSrv: CepService,
    private rota: Router,
    public modal: ModalController,
    private overlay: OverlayService,
    private actionSheetController: ActionSheetController,
    public auth: AuthService,
    private route: ActivatedRoute
  ) {
    this.nome = '';
    this.cep = '';
    this.cpf_cnpj = '';
    this.submitted = false;
    this.cadastrando_bairro = false;
    this.consultandoEndereco = false;
    this.cliente = new FormGroup({
      indicador_ie: new FormControl(9),
      bairro: new FormControl(''),
      cadastrando_bairro: new FormControl(''),
      ufSelecionada: new FormControl(''),
      municipio: new FormControl(''),
      uf: new FormControl(''),
      cpf_cnpj: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      nome: new FormControl('', [
        Validators.required,
        Validators.maxLength(60),
      ]),
      fantasia: new FormControl('', Validators.maxLength(60)),
      inscricao_estadual: new FormControl('', Validators.maxLength(20)),
      telefone: new FormControl('', [Validators.required]),
      cep: new FormControl('', [Validators.required, Validators.minLength(8)]),
      logradouro: new FormControl('', [
        Validators.required,
        Validators.maxLength(60),
      ]),
      numero: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
      ]),
      complemento: new FormControl('', Validators.maxLength(100)),
    });
  }

  get f() {
    return this.cliente.controls;
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
      this.route.params.subscribe((params) => {
        this.acao = params['acao'];
        const id_comprovante = params['id_comprovante'];

        if (this.acao === 'novo') {
          this.objComprovante = new OperacaoComprovante();
        } else {
          if (this.acao === 'copiando') {
            this.objComprovante.id = 0;
            this.objComprovante.id_nuvem;
            this.objComprovante.sincronizado_em;
          }
          OperacaoComprovanteUtil.PreecherDadosJson(this.objComprovante);
          this.carregando = false;
        }
      });
    } catch (e) {
      Util.TratarErro(e);
      this.carregando = false;
    }
  }

  async mostrarOpcoesGerais() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Aplicar no comprovante',
      mode: 'ios',
      buttons: [
        {
          text: 'Incluir observação no comprovante',
          icon: 'information-circle-outline',
          handler: () => {
            Util.EspecificarTexto(
              'Observação',
              'Insira aqui a observação',
              (_valor) => {
                this.objComprovante.dados_json.observacao = _valor;
              },
              this.objComprovante.dados_json.observacao
            );
          },
        },
        {
          text: 'Remover todos os produtos',
          icon: 'trash',
          handler: () => {
            Util.confirm('Remover todos os produtos lançados', () => {});
          },
        },
        {
          text: 'Limpar comprovante',
          icon: 'alert',
          handler: () => {
            Util.confirm('Limpar comprovante', () => {
              this.aba_selecionada = 'detalhes';
            });
          },
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }

  testarUmaBesteira() {
    this.rota.navigate(['/comprovante/detalhe-comprovante']);
  }

  async SalvarComprovante() {
    try {
      this.salvarSemValidar();
    } catch (err) {
      console.log(err);
      Util.AlertErrorPadrao();
    }
  }

  salvarSemValidar() {
    try {
      this.objComprovante.data = new Date().getTime();
      OperacaoComprovanteUtil.PreecherJson(this.objComprovante);

      console.log(this.objComprovante)
      this.overlay.notificarSucesso('Comprovante salvo com sucesso!');
      this.auth.informarSalvouComprovante();
      this.rota.navigate(['comprovante']);

    } catch (err) {
      Util.TratarErro(err);
      Util.AlertErrorPadrao();
    }
  }

  limparObservacaocomprovante() {
    Util.confirm('Limpar observação', () => {
      this.objComprovante.dados_json.observacao = '';
    });
  }

  setFocusDocumento() {
    try {
      setTimeout(() => {
        document.getElementById('cpf_cnpj')?.focus();
      }, 500);
    } catch (e) {
      console.error('setFocusDocumento', e);
    }
  }

  onConsutarCEP() {
    try {
      if (this.cep && this.cep.length === 8 && navigator.onLine) {
        console.log(this);
        this.consultandoEndereco = true;
        this.utilSrv.consultaCEP(this.cep).subscribe({
          next: (endereco) => {
            this.enderecoConsultado = endereco;
            if (endereco.erro) {
              Util.AlertWarning(
                'CEP não localizado, verifique se está correto!'
              );
              this.consultandoEndereco = false;
            } else {
              this.complemento = endereco.complemento;
              this.logradouro = endereco.logradouro;
              this.bairro = endereco.bairro;
              this.uf = endereco.uf;
              this.municipio = endereco.localidade;

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

  goTo(rota: any) {
    this.rota.navigate([rota]);
  }

  gerarPdf() {
    this.consultando = true;
    try {
      const content = document.getElementById('imprimir')?.innerHTML;

      if (content) {
        this.consultando = false;
        window.print();
      }
      (e: any) => {
        Util.TratarErro(e);
        this.limparDadosGerando();
        this.consultando = false;
      };
    } catch (e) {
      Util.TratarErro(e);
      this.limparDadosGerando();
      this.consultando = false;
    }
  }
  limparDadosGerando() {
    this.consultando = false;
    this.base64 = '';
  }

  async mostrarOpcoesComprovante(
    comprovante: OperacaoComprovante,
    index?: number
  ) {
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
            console.log('a');
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
          Util.confirm('Excluindo comprovante', async () => {});
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

  AbrirTelaComprovante(
    objComprovante?: OperacaoComprovante,
    copiando?: boolean
  ) {
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

    this.rota.navigate([
      'home/comprovante/tela-comprovante',
      { id_comprovante, acao },
    ]);
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

    this.rota.navigate([
      'home/comprovante/detalhe-comprovante',
      { id_comprovante, acao },
    ]);
  }
}
