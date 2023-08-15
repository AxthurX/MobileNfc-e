export class Orcamento {
  id: number;
  contratante: string;
  cpf_cnpj: string;
  servico: Servico[] = [];
  observacao: string;
  dados_pagamento: string;
  formas_pagamento: string;
  nao_incluso: string;
}

export class Servico {
  descricao_produto: string;
  descricao_servico: string;
  quantidade: number;
  valor_unitario: number;
}
