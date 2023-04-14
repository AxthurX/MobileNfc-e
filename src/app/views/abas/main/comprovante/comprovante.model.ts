export class Comprovante {
  ordem_de_servico: string;
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
  periodo_garantia: string;
  condicoes_garantia: string;
}

export class Pecas {
  descricao: string;
  unidade: number;
  preco_unitario: number;
  quantidade: number;
  preco: number;
}
