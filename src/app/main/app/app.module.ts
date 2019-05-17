import { RouteGuard } from './../../utilities/rout-guard.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FuseSharedModule } from '@fuse/shared.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import {
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
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatDatepickerModule,
    MatMenuModule,
    MatStepperModule,
    MatDividerModule
} from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NgArrayPipesModule } from 'ngx-pipes';
import { InvoiceComponent } from './invoice/invoice.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { FinancialComponent } from './financial/financial.component';
import { FuseSidebarModule, FuseWidgetModule } from '@fuse/components';

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
        FuseSidebarModule,
        FuseWidgetModule,
        MatDividerModule,
        NgxChartsModule,

    ],
    declarations: [DashboardComponent, AppComponent, InvoiceComponent, ReceiptComponent, FinancialComponent]
})
export class AppModule {}
