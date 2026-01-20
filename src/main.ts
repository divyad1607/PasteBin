import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';

import { App } from './app/app';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes), // ✅ Router
    importProvidersFrom(HttpClientModule),
    provideHttpClient()      // ✅ HttpClient (NEW WAY)
  ]
}).catch(err => console.error(err));
