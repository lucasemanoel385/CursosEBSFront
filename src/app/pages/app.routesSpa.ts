import { Routes } from '@angular/router';
import { BodyHomeComponent } from '../home/home-components/body-home.component';

import { CoursesIdComponent } from '../courses/courses-id/courses-id.component';
import { CoursesListComponent } from '../courses/courses-list/courses-list.component';

export const routesSPA: Routes = [

    {
        path:'',
        component: BodyHomeComponent
    },
    {
        path: 'courses/list',
        component: CoursesListComponent
    },
    {
        path: 'courses/list/:search',
        component: CoursesListComponent
    },
    {
        path: 'courses/:id',
        component: CoursesIdComponent
    }
];
