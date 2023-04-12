import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, Subject, fromEvent, merge, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public salvouComprovante$ = new Subject();
  public saiuDoApp$ = new Subject();
  public appIsOnline$: Observable<boolean>;
  constructor(private http: HttpClient, private router: Router) {}

  initConnectivityMonitoring() {
    if (!window || !navigator || !('onLine' in navigator)) {
      return;
    }

    this.appIsOnline$ = merge(
      of(null),
      fromEvent(window, 'online'),
      fromEvent(window, 'offline')
    ).pipe(map(() => navigator.onLine));
  }

  informarSalvouComprovante() {
    this.salvouComprovante$.next('');
  }
}

export class LoginResponse {
  token: string;
  guid_instalacao: string;
  dados_empresa: DadosEmpresa;
  id: number;
}

export class DadosColaborador {
  nome: string;
  id_usuario: number;
  id_colaborador: number;
  desconto_porcentagem_maximo_permitido: number;
}

export class DadosEmpresa {
  razao: string;
  url_api: string;
  url_zip_imagens: string;
  versao_gratis: boolean;
  fantasia: string;
  cpf_cnpj: string;
  cpf_cnpj_formatado: string;
  nome_colaborador: string;
  email: string;
  guid_instalacao: string;
  permissoes_mobile_json: string;
  id_empresa_erp: number;
  id_empresa_nuvem: number;
  id_colaborador: number;
  id_usuario: number;
  id_banco_dados: number;
  id_banco_gerenciador: number;
  nosso_id: string;
  desconto_porcentagem_maximo_permitido_empresa: number;
  desconto_porcentagem_maximo_permitido_usuario: number;
  multa_contas_a_receber_em_atraso?: number;
  juros_mensal_contas_a_receber_em_atraso?: number;
  dias_tolerancia_cobrar_juros?: number;
  logradouro: string;
  numero: string;
  municipio: string;
  uf: string;
  telefone: string;
}

export class UsuarioGrupoPermissoesMobile {
  bi: boolean = false;
  balanco: boolean = false;
  vendas: boolean = false;
  etiqueta: boolean = false;
  liberacoes: boolean = false;
  tirar_fotos: boolean = false;
  clientes: boolean = false;
}
