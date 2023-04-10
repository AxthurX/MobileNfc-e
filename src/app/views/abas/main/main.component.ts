import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(private modal: ModalController, private rota: Router) {}

  ngOnInit() {}

  goTo(rota: any) {
    this.rota.navigateByUrl(rota);
  }
}
