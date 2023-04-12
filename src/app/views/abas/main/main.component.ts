import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(private rota: Router) {}

  ngOnInit() {}

  goTo(rota: any) {
    this.rota.navigateByUrl(rota);
  }
}
