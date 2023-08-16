export class Orcamento {
  id: number;
  contratante: string;
  cpf_cnpj: string;
  servico: Servico[] = [];
  observacao: string;
  total_geral: number;
}

export class Servico {
  descricao_produto: string;
  descricao_servico: string;
  quantidade: number;
  valor_unitario: number;
}
