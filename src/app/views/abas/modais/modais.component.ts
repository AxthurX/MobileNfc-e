import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modais',
  templateUrl: './modais.component.html',
  styleUrls: ['./modais.component.scss'],
})
export class ModaisComponent implements OnInit {
  constructor(private modal: ModalController, private rota: Router) {}

  ngOnInit() {}



  async showTelaModal() {
    const modal = await this.modal.create({
      component: ModaisComponent,
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {}
    });

    return await modal.present();
  }
/*
  async showTelaOutroMapa() {
    const modal = await this.modal.create({
      component: OutroMapaComponent,
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {}
    });

    return await modal.present();
  } */

  goTo(rota: any) {
    this.rota.navigateByUrl(rota);
  }
}
