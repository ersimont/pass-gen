import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideServiceWorker } from '@angular/service-worker';
import { provideMatIcons } from '@s-libs/ng-mat-core';
import { icons } from './icons';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideMatIcons(icons),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};
