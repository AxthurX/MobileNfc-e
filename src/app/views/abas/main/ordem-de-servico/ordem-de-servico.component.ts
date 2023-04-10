import { Component, OnInit } from '@angular/core';
import { Util } from 'src/app/core/util.model';
import {
  Bairro,
  Municipio,
  OrdemDeServico,
  UF,
} from './ordem-de-servico.model';
import { CepService, RetornoEndereco } from 'src/app/core/service/cep.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ordem-de-servico',
  templateUrl: './ordem-de-servico.component.html',
  styleUrls: ['./ordem-de-servico.component.scss'],
})
export class OrdemDeServicoComponent implements OnInit {
  pessoa: FormGroup;
  submitted: boolean;
  cadastrando_bairro: boolean;
  bairro_descricao: string;
  validando_documento: boolean;
  ordem_de_servico: OrdemDeServico;
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

  constructor(private utilSrv: CepService, private rota: Router) {
    this.nome = '';
    this.cep = '';
    this.cpf_cnpj = '';
    this.submitted = false;
    this.cadastrando_bairro = false;
    this.consultandoEndereco = false;
    this.pessoa = new FormGroup({
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
