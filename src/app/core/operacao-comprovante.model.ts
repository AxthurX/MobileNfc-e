import { Comprovante } from '../views/abas/main/comprovante/comprovante.model';

export class OperacaoComprovante {
  id: number;
  data: number;
  json: string;
  id_nuvem?: number;
  estoque_locais?: number;
  sincronizado_em: string;
  dados_json: OperacaoComprovanteJson;
  constructor() {
    this.dados_json = new OperacaoComprovanteJson();
  }
}

export class OperacaoComprovanteJson {
  finalizado: boolean = false;
  nome?: string;
  email: string;
  cpf_cnpj: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  uf: string;
  municipio: string;
  bairro: string;
  telefone: string;
  observaocao_info: string;
  descricao_servico: string;
  preco_servico: string;
  descricao_pecas: string;
  unidade_pecas: string;
  preço_unitario_pecas: string;
  quantidade_pecas: string;
  preco_pecas: string;
  periodo_garantia: string;
  codicoes_garantia: string;
  constructor() {
    /* OperacaoComprovanteUtil.LimparBalanco(this); */
  }
}
