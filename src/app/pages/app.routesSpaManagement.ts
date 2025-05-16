import { Routes } from '@angular/router';
import { CourseListComponent } from '../management/courses/courses-component/course-list/course-list.component';
import { LessonListComponent } from '../management/lesson/lesson-component/lesson-list/lesson-list.component';
import { StudentsListComponent } from '../management/students/students-component/students-list/students-list.component';
import { CourseRegisterComponent } from '../management/courses/courses-component/course-register/course-register.component';
import { LesssonRegisterComponent } from '../management/lesson/lesson-component/lessson-register/lessson-register.component';
import { StudentsRegisterComponent } from '../management/students/students-component/students-register/students-register.component';
import { CategoryListComponent } from '../management/category/components/category-list/CategoryListComponent';
import { CategoryRegisterComponent } from '../management/category/components/category-register/category-register.component';
import { authorizationAdminGuard } from '../gurdsRoute/authorizationAdmin/authorization-admin.guard';

export const routesSPAmanagement: Routes = [

    {
        path:'',
        redirectTo:'course',
        pathMatch: 'full'
    },
    {
        path:'course',
        component: CourseListComponent
    },
    {
        path:'course/register',
        component:CourseRegisterComponent,
    },
    {
        path:'course/register/:id',
        component:CourseRegisterComponent
    },
    {
        path:'lesson',
        component:LessonListComponent
    },
    {
        path:'lesson/register',
        component:LesssonRegisterComponent
    },
    {
        path:'lesson/register/:id',
        component:LesssonRegisterComponent
    },
    {
        path:'category',
        component:CategoryListComponent
    },
    {
        path:'category/register',
        component:CategoryRegisterComponent
    },
    {
        path:'category/register/:id',
        component:CategoryRegisterComponent
    },
    {
        path:'student',
        component:StudentsListComponent,
        canActivate: [authorizationAdminGuard]
    },
    {
        path:'student/register',
        component:StudentsRegisterComponent
    },
    {
        path:'student/register/:id',
        component:StudentsRegisterComponent
    }
];
