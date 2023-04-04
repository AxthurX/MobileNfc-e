import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.scss'],
})
export class TesteComponent implements OnInit {

  constructor(private modal: ModalController, private rota: Router) { }

  ngOnInit() {}

  goTo(rota: any) {
    this.rota.navigateByUrl(rota);
  }
}
