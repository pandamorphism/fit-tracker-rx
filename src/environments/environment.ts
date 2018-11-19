// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyD5B13CueT09ka3-WlqaygksMNF4AnqCD8',
    authDomain: 'ng-fit-tracker-9e8ea.firebaseapp.com',
    databaseURL: 'https://ng-fit-tracker-9e8ea.firebaseio.com',
    projectId: 'ng-fit-tracker-9e8ea',
    storageBucket: 'ng-fit-tracker-9e8ea.appspot.com',
    messagingSenderId: '880239893939'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
