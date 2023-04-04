/* eslint-disable @typescript-eslint/naming-convention */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Util } from '../util.model';

@Component({
  selector: 'app-btn-voltar',
  template: `<ion-button class="top-cart" color="primary" (click)="voltar()">
    <ion-icon slot="start" name="arrow-back"></ion-icon>
  </ion-button>`,
})
export class BtnVoltarComponent {
  @Input() fechar_modal: boolean;
  @Input() solicitar_confirmacao: boolean;
  @Output() OnVoltou: EventEmitter<any> = new EventEmitter();
  constructor(
    private navController: NavController,
    private modal: ModalController
  ) {}

  voltar() {
    if (this.solicitar_confirmacao === true) {
      Util.confirm(
        'Nada será salvo e seu processo atual será interrompido',
        () => {
          if (this.fechar_modal === true) {
            this.modal.dismiss();
          } else {
            this.navController.back();
          }
          this.OnVoltou.emit();
        }
      );
    } else {
      if (this.fechar_modal === true) {
        this.modal.dismiss();
      } else {
        this.navController.back();
      }
      this.OnVoltou.emit();
    }
  }
}
