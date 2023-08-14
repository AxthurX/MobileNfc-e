import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColorSchemeService } from 'src/app/core/color-scheme.service';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Util } from 'src/app/core/util.model';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {
  versao: string;
  public temaEscuro: boolean;
  constructor(
    private color: ColorSchemeService,
    private appVersion: AppVersion,
    private rota: Router
  ) {
    this.color.load();
    this.temaEscuro = this.color.currentActive() === 'dark';
  }

  ngOnInit() {
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

  goTo(rota: any) {
    this.rota.navigate([rota]);
  }

  emBreve() {
    Util.Notificacao('Este módulo ainda está em desenvolvimento', 'info');
  }
}
