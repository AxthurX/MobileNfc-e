import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TesteComponent } from '../teste/teste.component';
import { Router } from '@angular/router';

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
      component: TesteComponent,
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
