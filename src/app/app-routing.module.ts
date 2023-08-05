import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard } from './core/guard/admin.guard';
import { authGuard } from './core/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'users',
    canActivate: [adminGuard],
    loadChildren: () => import('./features/users/users.module').then(m => m.UsersModule),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'settings',
    canActivate: [adminGuard],
    loadChildren: () => import('./features/settings/settings.module').then(m => m.SettingsModule)
  },
  {
    path: 'denied',
    loadChildren: () => import('./features/denied/denied.module').then(m => m.DeniedModule)
  },
  {
    path: 'not-found',
    loadChildren: () => import('./features/not-found/not-found.module').then(m => m.NotFoundModule)
  },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
