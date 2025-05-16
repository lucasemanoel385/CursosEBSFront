import { Component } from '@angular/core';
import { BodyHomeComponent } from '../../home/home-components/body-home.component';
import { HeaderComponent } from '../../default/header/header.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../default/footer/footer/footer.component';

@Component({
  selector: 'app-page-spa-intro',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, HeaderComponent],
  templateUrl: './page-spa-intro.component.html',
  styleUrl: './page-spa-intro.component.scss'
})
export class PageSpaIntroComponent {

}
