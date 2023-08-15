export class Comprovante {
  id: number;
  ordem_de_servico: string;
  numero_ordem_servico: number;
  nome: string;
  email: string;
  cpf_cnpj: string;
  telefone: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  uf: string;
  municipio: string;
  bairro: string;
  observacao_info: string;
  descricao_servico: string;
  preco_servico: number;
  pecas: Pecas[] = [];
  meios_pagamento: string;
  conta_pagamento: string;
  periodo_garantia: string;
  condicoes_garantia: string;
}

export class Pecas {
  descricao: string;
  unidade: number;
  preco_unitario: number;
  quantidade: number;
}
