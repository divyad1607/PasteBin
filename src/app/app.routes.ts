import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { CreatePaste } from './pages/create-paste/create-paste';
import { ViewPaste } from './pages/view-paste/view-paste';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'register',
    component: Register
  },
  {
    path: 'home',
    component: Home
  },
  {
    path: 'create',
    component: CreatePaste
  },
  {
    path: 'p/:id',
    component: ViewPaste
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
