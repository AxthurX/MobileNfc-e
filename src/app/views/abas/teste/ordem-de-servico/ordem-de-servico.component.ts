import { Component, OnInit } from '@angular/core';
import { Util } from 'src/app/core/util.model';
import { Bairro, Municipio, OrdemDeServico, UF } from './ordem-de-servico.model';
import { CepService, RetornoEndereco } from 'src/app/core/service/cep.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ordem-de-servico',
  templateUrl: './ordem-de-servico.component.html',
  styleUrls: ['./ordem-de-servico.component.scss'],
})
export class OrdemDeServicoComponent implements OnInit {
  submitted: boolean;
  ordem_de_servico: OrdemDeServico;
  nome: string;
  email: string;
  cpf_cnpj: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  telefone: string;
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

  constructor(private utilSrv: CepService, private rota: Router) {
    this.submitted = false;
    this.consultandoEndereco = false;
    this.cep = '';
    this.nome = '';
  }

  ngOnInit(): void {}

  setFocusDocumento() {
    try {
      setTimeout(() => {
        document.getElementById('cpf_cnpj')?.focus();
      }, 500);
    } catch (e) {
      console.error('setFocusDocumento', e);
    }
  }

  onAlterouUF(ordemDeServico: OrdemDeServico) {
    try {
      this.preencherMunicipios(ordemDeServico);
    } catch (e) {
      Util.TratarErro(e);
    }
  }

  preencherMunicipios(ordemDeServico: OrdemDeServico) {
    try {
      this.consultandoMunicipios = true;
      /* ordemDeServico.ufSelecionada = ordemDeServico.ufSelecionada; */
      this.bairros = [];
      this.municipios = [];
      ordemDeServico.bairroSelecionado;
      ordemDeServico.municipioSelecionado;
      // this.utilSrv.getMunicipio(ordemDeServico.ufSelecionada.id).subscribe((municipio) => {
      //     this.municipios = municipio.retorno;
      //     const ret = this.municipios.find(
      //         (c) => c.codigo.toUpperCase() === this.enderecoConsultado?.ibge?.toUpperCase()
      //     );
      //     if (ret) {
      //         ordemDeServico.municipioSelecionado = ret;
      //     }
      //     if (ordemDeServico.municipioSelecionado) {
      //         this.utilSrv.getBairro(ordemDeServico.municipioSelecionado?.id).subscribe((bairros) => {
      //             this.bairros = bairros.retorno;
      //             if (this.enderecoConsultado && !this.enderecoConsultado.bairro) {
      //                 //consultou um cep geral, n veio bairro, falo q é centro, foda-se
      //                 this.enderecoConsultado.bairro = 'CENTRO';
      //             }
      //             const bairro = this.bairros.find(
      //                 (c) => c.descricao.toUpperCase() === this.enderecoConsultado?.bairro?.toUpperCase()
      //             );

      //             if (bairro) {
      //                 ordemDeServico.bairroSelecionado = bairro;
      //             } else {
      //                 const novo_bairro = new Bairro();
      //                 novo_bairro.id = -1;
      //                 novo_bairro.id_municipio = ordemDeServico.municipioSelecionado.id;
      //                 novo_bairro.descricao = this.enderecoConsultado.bairro.toUpperCase();
      //                 /* novo_bairro.id_banco_dados = this.auth.getEmpresaLogada().id_banco_dados; */
      //                 ordemDeServico.bairroSelecionado = novo_bairro;
      //                 this.bairros.push(novo_bairro);
      //             }
      //             this.consultandoBairros = false;
      //         });
      //     }
      //     this.consultandoMunicipios = false;
      // });
    } catch (e) {
      Util.TratarErro(e);
      this.consultandoMunicipios = false;
    }
  }

  onAlterouMunicipio(ordemDeServico: OrdemDeServico) {
    try {
      this.consultandoBairros = true;
      this.bairros = [];
      // this.utilSrv.getBairro(OrdemDeServico.municipioSelecionado?.id).subscribe((bairros) => {
      //     this.bairros = bairros.retorno;
      //     if (this.enderecoConsultado && !this.enderecoConsultado.bairro) {
      //         //consultou um cep geral, n veio bairro, falo q é centro, foda-se
      //         this.enderecoConsultado.bairro = 'CENTRO';
      //     }
      //     const bairro = this.bairros.find(
      //         (c) => c.descricao.toUpperCase() === this.enderecoConsultado?.bairro?.toUpperCase()
      //     );
      //     if (bairro) {
      //         ordemDeServico.bairroSelecionado = bairro;
      //     }
      //     this.consultandoBairros = false;
      // });
    } catch (e) {
      Util.TratarErro(e);
      this.consultandoBairros = false;
    }
  }

  // onAlterouBairro(ev: OrdemDeServico) {
  //   try {
  //     this.ordemDeServico.bairroSelecionado = ev;
  //   } catch (e) {
  //     Util.TratarErro(e);
  //   }
  // }

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

                // //consulto a uf
                const uf = this.ufs.find(
                  (c) => c.sigla.toLocaleUpperCase() === endereco.uf.toUpperCase()
                );
                // if (uf) {
                //     this.ufSelecionada = uf;
                // }
                /*  this.preencherMunicipios(this.ordem_de_servico); */
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
}
