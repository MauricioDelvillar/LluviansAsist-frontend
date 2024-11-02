// import { Routes } from '@angular/router';
// export const routes: Routes = [];
import { Routes } from '@angular/router';
import { InicioComponent } from './modules/inicio/inicio.component';
import { ConfiguracionComponent } from './modules/configuracion/configuracion.component';
import { PerfilComponent } from './modules/perfil/perfil.component';
import { LoginComponent } from './modules/login/login.component';

export const routes: Routes = [
  { path: 'trainer', component: InicioComponent },
  { path: 'admin', component: ConfiguracionComponent },
  { path: 'user', component: PerfilComponent },
  { path: 'login', component: LoginComponent, canActivate: [] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirección por defecto
  //{ path: '**', loadComponent: () => import('').then(comp => comp.NotFoundComponent) }
];
