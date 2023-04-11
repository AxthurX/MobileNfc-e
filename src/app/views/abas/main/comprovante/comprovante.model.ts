/* eslint-disable @typescript-eslint/naming-convention */
export class Comprovante {
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
}

export class Bairro {
  id: number;
  descricao: string;
  id_municipio: number;
  id_erp: number;
  id_banco_dados: number;
}

export class UF {
  id: number;
  descricao: string;
  sigla: string;
  codigo: string;
  id_pais: number;
  aliquota_icms_interna: number;
  aliquota_fcp_interna: number;
  dias_feriados_estaduais: number;
}

export class Municipio {
  id: number;
  id_uf: number;
  percentual: number;
  dias_feriados_municipais: number;
  descricao: string;
  codigo: string;
  zona_franca: boolean;
}
