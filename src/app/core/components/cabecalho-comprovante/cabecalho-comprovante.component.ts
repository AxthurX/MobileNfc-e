import { Component, Input, OnInit } from '@angular/core';
import { OperacaoComprovanteJson } from '../../operacao-comprovante.model';

@Component({
  selector: 'app-cabecalho-comprovante',
  templateUrl: './cabecalho-comprovante.component.html',
  styleUrls: ['./cabecalho-comprovante.component.scss'],
})
export class CabecalhoComprovanteComponent {
  @Input() objComprovante: OperacaoComprovanteJson;

  constructor() {}

  GetClasse() {
    return this.objComprovante.id_nuvem
      ? 'finalizado'
      : this.objComprovante
      ? 'comprovante'
      : 'comprovante';
  }
}
