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
  data_exclusao?: number;
  data: number;
  id_nuvem?: number;
  id_erp_estoque_locais?: number;
  quantidade_produtos_lancados: number;
  //1: sincronizando - 2: excluindo
  status_manipulacao?: number;
  sincronizado_em?: string;
  observacao: string;
  constructor() {
    /* OperacaoComprovanteUtil.LimparBalanco(this); */
  }
}
