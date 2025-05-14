// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'archive',
        pathMatch: 'full',
      },
      {
        path: 'archive',
        loadComponent: () =>
          import('./pages/archive/archive.component').then(
            (m) => m.ArchiveComponent
          ),
      },
      {
        path: 'collections/',
        redirectTo: 'collections/suenhos',
      },
      {
        path: 'collections/:collection',
        loadComponent: () =>
          import('./pages/collections/collections.component').then(
            (m) => m.CollectionsComponent
          ),
      },
      {
        path: 'artwork/:id',
        loadComponent: () =>
          import('./pages/artwork-page/artwork-page.component').then(
            (m) => m.ArtworkPageComponent
          ),
      },
      {
        path: 'studio',
        loadComponent: () =>
          import('./pages/studio/studio.component').then(
            (m) => m.StudioComponent
          ),
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./pages/about/about.component').then((m) => m.AboutComponent),
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./pages/contact/contact.component').then(
            (m) => m.ContactComponent
          ),
      },
    ],
  },
];
