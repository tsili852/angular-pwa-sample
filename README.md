# Angular Pwa Sample (Material)

### Project Description
The goal of this repo is to provide a starter boilerplate application. The application is PWA enabled with the bellow implementations :

- eventLister for offline/online status
```typescript
    window.addEventListener('online', () => {
      noInternetSnack.dismiss();
    });

    window.addEventListener('offline', () => {
      noInternetSnack = this.snackBar.open('No Internet connection', 'Ok');
    });
```

- eventListener for `beforeinstallprompt  
When we catch the event, we store it in a variable and prevent the default behaviour of the browser (Add to homescreen snackbar). Then, we display our own customized snackbar and catch the user's response. If the user accepts to install the application, we use the stored event to prompt for the browser's dialog. In the end we display the user's choice.
```typescript
    window.addEventListener('beforeinstallprompt', event => {
      event.preventDefault();

      this.promptEvent = event;
      const snackInstall = this.snackBar.open('Do you want to install the application to your device ?', 'Install', { duration: 3000 });

      snackInstall.onAction().subscribe(() => {
        this.promptEvent.prompt();
        this.promptEvent.userChoice.then(choiceResult => {
          if (choiceResult.outcome === 'accepted') {
            this.snackBar.open('PWA install accepted', 'Ok', { duration: 3000 });
          } else {
            this.snackBar.open('PWA install dismissed', 'Ok', { duration: 3000 });
          }
        });
      });
    });
```

---
### Libraries
- Angular : 7.0.0
- Angular CDK : 7.0.4
- Angular Material : 7.0.4 
- Angular Service Worker : 7.0.0
---

### Cloning and running
1. `git clone https://github.com/tsili852/angular-pwa-sample.git my-new-app`
2. `cd my-new-app`
3. `npm install`
4. `ng serve`
---

### Checking PWA
In order to check the PWA capabilities we need to run the application from a web server. The [http-server](https://www.npmjs.com/package/http-server) package helps us with that.
1. `npm i http-server`
2. (optional) `npm i -g http-server`
3. `ng build --prod`
4. `http-serve dist/`
> `angular.json` is modified to build the app in the `dist` folder and not in `dist/my-project-name`
---
