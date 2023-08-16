import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orcamento',
  templateUrl: './orcamento.component.html',
  styleUrls: ['./orcamento.component.scss'],
})
export class OrcamentoComponent implements OnInit {
  constructor(private rota: Router) {}

  ngOnInit() {}

  AbrirTelaOrcamento() {
    this.rota.navigate(['home/orcamento/tela-orcamento']);
  }
}
