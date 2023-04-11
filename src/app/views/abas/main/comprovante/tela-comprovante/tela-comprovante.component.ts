import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CepService, RetornoEndereco } from 'src/app/core/service/cep.service';
import { Util } from 'src/app/core/util.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  Bairro,
  Comprovante,
  Municipio,
  UF
} from '../comprovante.model';
import { OperacaoComprovante } from '../../../../../core/operacao-comprovante.model';
import { Subscription, fromEvent } from 'rxjs';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { OverlayService } from 'src/app/core/service/overlay.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { OperacaoComprovanteUtil } from '../../../../../core/operacao-comprovante-util.model';

@Component({
  selector: 'app-tela-comprovante',
  templateUrl: './tela-comprovante.component.html',
  styleUrls: ['./tela-comprovante.component.scss'],
})
export class TelaComprovanteComponent implements OnInit {
  @ViewChild('btnVoltar') btnVoltar: ElementRef;
  @Input() objComprovante: OperacaoComprovante;
  @Input() copiando?:boolean;
  aba_selecionada: string;
  carregando: boolean;
  //nova ou editando
  acao: string;
  private backbuttonSubscription: Subscription;
  cliente: FormGroup;
  submitted: boolean;
  cadastrando_bairro: boolean;
  bairro_descricao: string;
  validando_documento: boolean;
  ordem_de_servico: Comprovante;
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
  ufSelecionada: UF;
  municipioSelecionado: Municipio;
  bairroSelecionado: Bairro;
  ufs: UF[] = [];
  bairros: Bairro[] = [];
  municipios: Municipio[] = [];
  consultandoMunicipios: boolean;
  consultandoBairros: boolean;
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
    auth: AuthService,
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
          /* this.btnVoltar.voltar(); */
        } catch {}
      });
      // this.route.params.subscribe((params) => {
      //   this.acao = params.acao;
      //   const id_comprovante = params.id_comprovante;

      //   this.dados.getEmpresaLogada().then((empresa) => {
      //     this.empresa_logada = empresa;

      //     if (this.acao === 'novo') {
      //       this.objComprovante = new Operacaocomprovante();
      //     } else {
      //       this.dados
      //         .getOperacaocomprovante(id_comprovante)
      //         .then((comprovante) => {
      //           this.objComprovante = comprovante;
      //           if (this.acao === 'copiando') {
      //             this.objComprovante.id = 0;
      //             this.objComprovante.id_nuvem = null;
      //             this.objComprovante.sincronizado_em = null;
      //           }
      //           OperacaoComprovanteUtil.PreecherDadosJson(this.objComprovante);
      //           this.carregando = false;
      //         })
      //         .catch((e: any) => {
      //           Util.TratarErro(e);
      //           this.carregando = false;
      //         });
      //     }
      //   });
      // });
    } catch (e) {
      Util.TratarErro(e);
      this.carregando = false;
    }
  }

  async mostrarOpcoesGerais() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Aplicar no balanço',
      mode: 'ios',
      buttons: [{
          text: 'Incluir observação no balanço',
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
            Util.confirm('Remover todos os produtos lançados', () => {
            });
          },
        },
        {
          text: 'Limpar balanço',
          icon: 'alert',
          handler: () => {
            Util.confirm('Limpar balanço', () => {
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
      //this.objComprovante.data = new Date().getTime();
      OperacaoComprovanteUtil.PreecherJson(this.objComprovante);
      // this.dados
      //   .salvarComprovante(this.objComprovante)
      //   .then(() => {
           this.overlay.notificarSucesso('Comprovante salvo com sucesso!');
           this.rota.navigate(['comprovante']);
      //   })
      //   .catch((e: any) => {
      //     Util.TratarErro(e);
      //     Util.AlertErrorPadrao();
      //   });
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
                this.municipio = endereco.localidade

                // //consulto a uf
                const uf = this.ufs.find(
                  (c) => c.sigla.toLocaleUpperCase() === endereco.uf.toUpperCase()
                );
                this.consultandoEndereco = false;
                this.consultandoMunicipios = false;
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
}
