import { Component } from '@angular/core';
import { routerTransition } from './router.animations';

@Component({
  selector: 'app-root',
  animations: [routerTransition],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Dev Attic';

  getState(outlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['state'];
  }
}
