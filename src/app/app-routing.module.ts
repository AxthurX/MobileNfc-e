import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
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
    path: 'fotos',
    loadChildren: () =>
      import('./views/abas/modais/fotos/fotos.module').then((m) => m.FotosModule
      ),
  },
  {
    path: 'cabecalho',
    loadChildren: () =>
      import('./views/abas/teste/cabecalho/cabecalho.module').then((m) => m.CabecalhoModule
      ),
  },
  {
    path: 'informacao-basica',
    loadChildren: () =>
      import('./views/abas/teste/informacao-basica/informacao-basica.module').then((m) => m.InformacaoBasicaModule)
  },
  {
    path: 'ordem-de-servico',
    loadChildren: () =>
      import('./views/abas//teste/ordem-de-servico/ordem-de-servico.module').then((m) => m.OrdemDeServicoModule)
  },
  {
    path: 'pagamentos',
    loadChildren: () =>
      import('./views/abas/teste/pagamentos/pagamentos.module').then((m) => m.PagamentosModule)
  },
  {
    path: 'pecas',
    loadChildren: () =>
      import('./views/abas/teste/pecas/pecas.module').then((m) => m.PecasModule)
  },
  {
    path: 'servicos',
    loadChildren: () =>
      import('./views/abas/teste/servicos/servicos.module').then((m) => m.ServicosModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
