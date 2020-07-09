// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  environment_name: 'development',
  apiURL: 'http://localhost:3001/api/v1',
  firebaseConfig: {
    apiKey: 'AIzaSyBX3rBJ5NQJfHQTSzhZPRr0jVM2Mjxc16M',
    authDomain: 'tot-gls-265709.firebaseapp.com',
    databaseURL: 'https://tot-gls-265709.firebaseio.com',
    projectId: 'tot-gls-265709',
    storageBucket: 'tot-gls-265709.appspot.com',
    messagingSenderId: '266101667371',
    appId: '1:266101667371:web:bfc87547e748ec251a1c6e',
    measurementId: 'G-VF37Z2KXL4'
  },
  appRole: '2',
  googleMapApiKey: 'AIzaSyC2q98PSobmuY7FJI5AowXOSTSGNyuDjzU'
};
