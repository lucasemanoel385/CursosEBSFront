import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PopUpComponent } from "./default/pop-up/pop-up/pop-up.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PopUpComponent],
  template: `
  <router-outlet/>
  <app-pop-up/>`,
  styles: ''
})
export class AppComponent {
  title = 'platform';
}
