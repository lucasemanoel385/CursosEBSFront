import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-layout-login-create',
  standalone: true,
  imports: [],
  templateUrl: './layout-login-create.component.html',
  styleUrl: './layout-login-create.component.scss'
})
export class LayoutLoginCreateComponent {

  @Input() title?: string;

}
