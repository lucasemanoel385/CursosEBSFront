import { Component, computed, DoCheck, inject, OnChanges, SimpleChanges } from '@angular/core';
import { ServicePopupService } from '../../service/service-popup.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pop-up',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.scss'
})
export class PopUpComponent {

  servicePopup = inject(ServicePopupService);

}
