import { Component } from '@angular/core';
import { Util } from '../util.model';
import { AuthService } from '../service/auth.service';
import { OverlayService } from '../service/overlay.service';

@Component({
  selector: 'app-btn-sair',
  template: `<ion-button (click)="sair()" class="top-cart" color="primary">
    <ion-icon slot="start" name="log-out-outline"></ion-icon>
  </ion-button> `,
})
export class BtnSairComponent {
  constructor(private overlay: OverlayService, private authSrv: AuthService) {}
  sair() {
    try {
      Util.AlertaPergunta('Deseja realmente sair?', this.overlay, () => {
        this.authSrv.logout();
      });
    } catch (e) {
      Util.AlertErrorPadrao();
    }
  }
}
