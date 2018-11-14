import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  promptEvent: any;

  title = 'Angular PWA Sample';

  constructor(
    private readonly swUpdate: SwUpdate,
    private readonly snackBar: MatSnackBar
  ) {
    let noInternetSnack;

    window.addEventListener('online', () => {
      noInternetSnack.dismiss();
    });

    window.addEventListener('offline', () => {
      noInternetSnack = this.snackBar.open('No Internet connection', 'Ok');
    });

    if (this.swUpdate.isEnabled) {
      this.snackBar.open('Service Workers enabled', 'Ok', { duration: 3000 });
    }

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
  }
}
