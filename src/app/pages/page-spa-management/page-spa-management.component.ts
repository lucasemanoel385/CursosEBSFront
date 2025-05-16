import { Component } from '@angular/core';
import { AsideComponent } from '../../management-default/aside/aside.component';
import { ListDefaultComponent } from '../../management-default/list-default/list-default.component';
import { CourseListComponent } from '../../management/courses/courses-component/course-list/course-list.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-page-spa-management',
  standalone: true,
  imports: [AsideComponent, RouterOutlet],
  templateUrl: './page-spa-management.component.html',
  styleUrl: './page-spa-management.component.scss'
})
export class PageSpaManagementComponent {

}
