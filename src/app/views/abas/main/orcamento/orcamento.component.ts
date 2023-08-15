import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { OverlayService } from 'src/app/core/service/overlay.service';

@Component({
  selector: 'app-orcamento',
  templateUrl: './orcamento.component.html',
  styleUrls: ['./orcamento.component.scss'],
})
export class OrcamentoComponent implements OnInit {
  constructor(
    private modal: ModalController,
    private overlay: OverlayService,
    private rota: Router
  ) {}

  ngOnInit() {}

  AbrirTelaOrcamento() {
    this.rota.navigate(['home/orcamento/tela-orcamento']);
  }
}
