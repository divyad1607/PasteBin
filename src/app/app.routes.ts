import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Home} from './pages/home/home';
import { CreatePaste } from './pages/create-paste/create-paste';
import { ViewPaste } from './pages/view-paste/view-paste';

export const routes: Routes = [
  // Is line se localhost:4200 khulte hi seedha Create page aayega
  { path: '', redirectTo: 'create', pathMatch: 'full' }, 
  { path: 'create', component: CreatePaste },
  { path: 'home', component: Home },
  { path: 'paste/:id', component: ViewPaste },
  { path: 'login', component: Login },
  { path: 'register', component: Register }
];