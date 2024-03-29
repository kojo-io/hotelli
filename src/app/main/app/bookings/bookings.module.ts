import { RouteGuard } from 'app/utilities/rout-guard.service';
import { BookComponent } from './book/book.component';

import { FuseSharedModule } from '@fuse/shared.module';
import { BookingsComponent } from './bookings.component';
import { ListBookingsComponent } from './list-bookings/list-bookings.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ListguestComponent } from './list-bookings/tabs/listguest/listguest.component';
import { NewguestComponent } from './list-bookings/tabs/newguest/newguest.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { ExtenddaysComponent } from './extenddays/extenddays.component';
import { CheckinsComponent } from './checkins/checkins.component';
import { DialogComponent } from './dialog/dialog.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
// tslint:disable-next-line: max-line-length
import { MatDialogModule, MatTooltipModule, MatFormFieldModule, MatInputModule, MatCardModule, MatSelectModule, MatSnackBarModule, MatPaginatorModule, MatSortModule, MatIconModule, MatTabsModule, MatBadgeModule, MatCheckboxModule, MatDatepickerModule, MatButtonModule, MatProgressSpinnerModule, MatTableModule, MatMenuModule, MatStepperModule, MAT_DATE_LOCALE } from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { NgArrayPipesModule } from 'ngx-pipes';
import { BillingComponent } from '../financial/billing/billing.component';
import { CalendarModule as AngularCalendarModule } from 'angular-calendar';
import { AllComponent } from './all/all.component';


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
                path: 'guests',
                canActivate: [RouteGuard],
                component: ListBookingsComponent
            },
            {
                path: 'list',
                canActivate: [RouteGuard],
                component: AllComponent
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
        BillingComponent,
        DialogComponent,
        AllComponent
    ],
    entryComponents: [ReservationsComponent, ExtenddaysComponent, CheckinsComponent, BillingComponent, DialogComponent],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
    ]
})
export class BookingsModule {}
