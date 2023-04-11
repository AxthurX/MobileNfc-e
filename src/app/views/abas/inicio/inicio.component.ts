import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MainComponent } from '../main/main.component';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent {
  constructor(private modal: ModalController, private rota: Router) {}

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
      component: MainComponent,
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
      }
    });

    return await modal.present();
  }

  goTo(rota: any) {
    this.rota.navigate([rota]);
  }
}
