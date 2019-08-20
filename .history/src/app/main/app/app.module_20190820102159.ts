import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgArrayPipesModule } from 'ngx-pipes';

import { DashboardComponent } from './dashboard/dashboard.component';
import { FuseSharedModule } from '@fuse/shared.module';

import { InvoiceComponent } from './invoice/invoice.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { FinancialComponent } from './financial/financial.component';
import { FuseSidebarModule, FuseWidgetModule, FuseProgressBarModule, FuseThemeOptionsModule } from '@fuse/components';
import { FuseModule } from '@fuse/fuse.module';
import { fuseConfig } from 'app/fuse-config';
import { HttpinterceptorService } from 'app/utilities/httpinterceptor.service';
import { Routes, RouterModule } from '@angular/router';
import { RouteGuard } from 'app/utilities/rout-guard.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// tslint:disable-next-line: max-line-length
import { MatDialogModule, MatTooltipModule, MatFormFieldModule, MatInputModule, MatCardModule, MatSelectModule, MatSnackBarModule, MatPaginatorModule, MatSortModule, MatIconModule, MatTabsModule, MatBadgeModule, MatCheckboxModule, MatDatepickerModule, MatButtonModule, MatProgressSpinnerModule, MatTableModule, MatMenuModule, MatStepperModule, MatDividerModule, MAT_DATE_LOCALE } from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { LayoutModule } from '@angular/cdk/layout';
// import { AppsComponent } from './app.component';
import 'hammerjs';
// import { DialogboxComponent } from './components/dialogbox/dialogbox.component';


const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                canActivate: [RouteGuard],
                component: DashboardComponent
            },
            {
                path: 'dashboard',
                canActivate: [RouteGuard],
                component: DashboardComponent
            },
            {
                path: 'setup',
                loadChildren: './setup/setup.module#SetupModule'
            },
            {
                path: 'bookings',
                loadChildren: './bookings/bookings.module#BookingsModule'
            },
            {
                path: 'invoice',
                canActivate: [RouteGuard],
                component: InvoiceComponent
            }
            ,
            {
                path: 'receipt',
                canActivate: [RouteGuard],
                component: ReceiptComponent
            }
            
        ]
    }
    
];

@NgModule({
    
    imports: [
        CommonModule,
        HttpClientModule,
        MatDialogModule,
        MatTooltipModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatSelectModule,
        MatSnackBarModule,
        MatPaginatorModule,
        MatSortModule,
        MatIconModule,
        MatTabsModule,
        MatBadgeModule,
        MatCheckboxModule,
        // BrowserAnimationsModule,
        NgxDatatableModule,
        /* Material moment date module */
        MatMomentDateModule,
        MatDatepickerModule,
        /* Material modules */
        MatIconModule,
        MatButtonModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatTableModule,
        MatSortModule,
        FuseSharedModule,
        MatMenuModule,
        MatStepperModule,
        NgArrayPipesModule,
        RouterModule.forChild(routes),
        FuseWidgetModule,
        MatDividerModule,
        NgxChartsModule,

        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        LayoutModule,


    ],
    declarations: [DashboardComponent, InvoiceComponent, ReceiptComponent, FinancialComponent],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
        { provide: HTTP_INTERCEPTORS, useClass: HttpinterceptorService, multi: true },
    ],
    entryComponents: []
})
export class AppModule {}
