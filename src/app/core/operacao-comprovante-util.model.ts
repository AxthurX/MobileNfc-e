import { OperacaoComprovante } from './operacao-comprovante.model';

export class OperacaoComprovanteUtil {
  static PreecherDadosJson(comprovante: OperacaoComprovante) {
    comprovante.dados_json = JSON.parse(comprovante.json);
    comprovante.dados_json.data = comprovante.data;
    comprovante.dados_json.sincronizado_em = comprovante.sincronizado_em;
    comprovante.dados_json.id_nuvem = comprovante.id_nuvem;
  }

  static PreecherJson(comprovante: OperacaoComprovante) {
    comprovante.json = JSON.stringify(comprovante.dados_json);
  }
}
