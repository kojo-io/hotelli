import { RouteGuard } from './utilities/rout-guard.service';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppsComponent } from './main/app/app.component';

const routes: Routes = [
    {
        path: 'login',
        loadChildren: './main/login/login.module#LoginModule'
    },
    {
        path: 'register',
        loadChildren: './main/register/register.module#RegisterModule'
    },
    {
        path: 'app',
        canActivate: [RouteGuard],
        loadChildren: './main/app/app.module#AppModule',
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: '*',
        redirectTo: '404'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
