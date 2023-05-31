import { Component } from '@angular/core';
import { ColorSchemeService } from './core/color-scheme.service';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private color: ColorSchemeService,
    private platform: Platform,
    private statusbar: StatusBar
  ) {
    this.initializeApp()
  }

  initializeApp() {
    try {
      this.platform.ready().then(() => {
        this.color.load()
      })
    } catch{}
  }
}
