import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TesteComponent } from '../teste/teste.component';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent {
  constructor(private modal: ModalController) {}

  async showTelaDeFotos() {
    const modal = await this.modal.create({
      component: 'FotosComponent',
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
      }
    });

    return await modal.present();
  }

  async showTelaDeTeste() {
    const modal = await this.modal.create({
      component: TesteComponent,
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
      }
    });

    return await modal.present();
  }
}
