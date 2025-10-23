import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/series',
    pathMatch: 'full'
  },
  {
    path: 'series',
    loadChildren: () => import('./series/series-module').then(m => m.SeriesModule)
  },
  {
    path: '**',
    redirectTo: '/series'
  }
];
