import { PaymetMarketPayComponent } from './payments/components/paymet-market-pay/paymet-market-pay.component';
import { Component } from '@angular/core';
import { routesSPA } from './pages/app.routesSpa';
import { Routes } from '@angular/router';
import { BodyHomeComponent } from './home/home-components/body-home.component';
import { PageSpaIntroComponent } from './pages/page-spa-intro/page-spa-intro.component';
import { PageSpaManagementComponent } from './pages/page-spa-management/page-spa-management.component';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { PageRegisterComponent } from './pages/page-register/page-register.component';
import { PageRecoverPasswordComponent } from './pages/page-recover-password/page-recover-password.component';
import { authorizationGuard } from './gurdsRoute/authorization/authorization-guard.guard';

export const routes: Routes = [

    {
        path:'',
        component: PageSpaIntroComponent,
        loadChildren: () => import('./pages/app.routesSpa').then((r) => r.routesSPA),
    },
    {
        path:'management',
        component: PageSpaManagementComponent,
        canActivate: [authorizationGuard],
        loadChildren: () => import('./pages/app.routesSpaManagement').then((r) => r.routesSPAmanagement)
    },
    {
        path: 'login',
        component: PageLoginComponent
    },
    {
        path: 'recover-password',
        component: PageRecoverPasswordComponent
    },
    {
        path: 'register',
        component: PageRegisterComponent
    },
    {
        path: 'payment/success',
        component: PaymetMarketPayComponent
    }
];
