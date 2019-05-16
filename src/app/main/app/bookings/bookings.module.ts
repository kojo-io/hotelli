import { BillingComponent } from './../financial/billing/billing.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteGuard } from 'app/utilities/rout-guard.service';
import { BookComponent } from './book/book.component';
import { HttpClientModule } from '@angular/common/http';
import { CalendarModule as AngularCalendarModule } from 'angular-calendar';
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
    MatDatepickerModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatMenuModule,
    MatStepperModule
} from '@angular/material';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { FuseSharedModule } from '@fuse/shared.module';
import { NgArrayPipesModule } from 'ngx-pipes';
import { BookingsComponent } from './bookings.component';
import { ListBookingsComponent } from './list-bookings/list-bookings.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ListguestComponent } from './list-bookings/tabs/listguest/listguest.component';
import { NewguestComponent } from './list-bookings/tabs/newguest/newguest.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { ExtenddaysComponent } from './extenddays/extenddays.component';
import { CheckinsComponent } from './checkins/checkins.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'calendar',
                canActivate: [RouteGuard],
                component: CalendarComponent
            },
            {
                path: 'book',
                canActivate: [RouteGuard],
                component: BookingsComponent
             },
            {
                path: 'list',
                canActivate: [RouteGuard],
                component: ListBookingsComponent
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
        AngularCalendarModule.forRoot()
    ],
    declarations: [
        BookingsComponent,
        BookComponent,
        ListBookingsComponent,
        CalendarComponent,
        ListguestComponent,
        NewguestComponent,
        ReservationsComponent,
        ExtenddaysComponent,
        CheckinsComponent,
        BillingComponent
    ],
    entryComponents: [ReservationsComponent, ExtenddaysComponent, CheckinsComponent, BillingComponent]
})
export class BookingsModule {}
