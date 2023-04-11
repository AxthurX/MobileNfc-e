import { OperacaoComprovante, OperacaoComprovanteJson } from './operacao-comprovante.model';
import { DadosEmpresa } from './service/auth.service';
import { Util } from './util.model';

export class OperacaoComprovanteUtil {
  static PreecherDadosJson(comprovante: OperacaoComprovante) {
    comprovante.dados_json = JSON.parse(comprovante.json);
    comprovante.dados_json.data = comprovante.data;
    comprovante.dados_json.quantidade_produtos_lancados = 0;
    comprovante.dados_json.sincronizado_em = comprovante.sincronizado_em;
    comprovante.dados_json.id_nuvem = comprovante.id_nuvem;
  }

  static PreecherJson(comprovante: OperacaoComprovante) {
    comprovante.json = JSON.stringify(comprovante.dados_json);
  }

  static Limparcomprovante(comprovante: OperacaoComprovanteJson) {
    comprovante.finalizado = false;
    this.LimparValores(comprovante);
  }

  static LimparValores(comprovante: OperacaoComprovanteJson) {
    comprovante.quantidade_produtos_lancados = 0;
  }

  static RecalcularTotais(comprovante: OperacaoComprovanteJson) {
    this.LimparValores(comprovante);

  }

  static Validar(
    comprovante: OperacaoComprovanteJson,
  ): boolean {
    // if (!comprovante.estoque_locais) {
    //   Util.AlertWarning('Selecione um Local de estoque');
    //   return false;
    // }
    // if (comprovante.produtos.length === 0) {
    //   Util.AlertWarning('Adicione um ou mais produtos no balanço');
    //   return false;
    // }

    const estaTudoValido = true;

    if (!estaTudoValido) {
      Util.AlertWarning(
        `Um ou mais produtos contém erro de validação, por favor confira na aba 'produtos' e faça os devidos ajustes`
      );
      return false;
    }

    return true;
  }
}
