/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { Util } from 'src/app/core/util.model';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styleUrls: ['./fotos.component.scss'],
})
export class FotosComponent {
  constructor(private navCtrl: NavController) {}

  digitarCodigoIntegracao() {
    Util.EspecificarTexto(
      'Digite o código de 4 dígitos',
      'Código que você gerou no Nosso ERP',
      (codigo) => {
        if (codigo) {
          this.navCtrl.navigateForward('fotos?id=' + codigo);
        }
      },
      '',
      'number'
    );
  }
}
