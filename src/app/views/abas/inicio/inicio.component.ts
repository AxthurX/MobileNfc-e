import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MainComponent } from '../main/main.component';
import { ColorSchemeService } from 'src/app/core/color-scheme.service';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Util } from 'src/app/core/util.model';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {
  public temaEscuro: boolean;
  versao: string;
  constructor(
    private color: ColorSchemeService,
    private modal: ModalController,
    private appVersion: AppVersion,
    private rota: Router
  ) {
    this.color.load();
    this.temaEscuro = this.color.currentActive() === 'dark';

    try {
      this.appVersion.getVersionNumber().then((versao) => {
        this.versao = versao;
      });
    } catch {}
  }

  alterarTema() {
    if (this.temaEscuro === true) {
      this.color.update('dark');
    } else {
      this.color.update('light');
    }
  }

  ngOnInit() {}

  async showTelaConsulta() {
    const modal = await this.modal.create({
      component: 'ConsultaProdutoComponent',
      componentProps: {
        apenas_consulta: true,
      },
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

  emBreve() {
    Util.Notificacao('Este módulo ainda está em desenvolvimento', 'info');
  }
}
