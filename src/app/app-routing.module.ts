import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./views/abas/abas.module').then((m) => m.AbasModule),
  },
  {
    path: 'inicio',
    loadChildren: () =>
      import('./views/abas/inicio/inicio.module').then((m) => m.InicioModule),
  },
  {
    path: 'comprovante',
    loadChildren: () =>
      import('./views/abas/main/comprovante/comprovante.module').then((m) => m.ComprovanteModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
