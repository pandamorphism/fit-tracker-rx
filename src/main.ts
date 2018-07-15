import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import 'hammerjs';
import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import {create} from 'rxjs-spy';

if (environment.production) {
  enableProdMode();
} else {
  create();
}
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
