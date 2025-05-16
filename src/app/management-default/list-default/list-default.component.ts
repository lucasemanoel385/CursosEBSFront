import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-default',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './list-default.component.html',
  styleUrl: './list-default.component.scss'
})
export class ListDefaultComponent {

  @Input() title!: string;

  @Input() routeLink!: string;

  @Input() nameCreate!: string;
  
  @Input() placeHolder!: string;

  @Output() public outputSearch = new EventEmitter<string>();

  public emitSearch(search: string): any {
    
    this.outputSearch.emit(search);
  }
}
