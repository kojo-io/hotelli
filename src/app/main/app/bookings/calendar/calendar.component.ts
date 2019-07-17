import { CalendarEventAction, CalendarEvent, CalendarMonthViewDay, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { BookingService } from '../booking.service';
import { RoomService } from '../../setup/rooms/room.service';
import { BaseService } from 'app/utilities/base.service';
import { startOfDay, isSameMonth, isSameDay } from 'date-fns';
import { fuseAnimations } from '@fuse/animations';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { navigation } from 'app/navigation/navigation';
import { receptionNav } from 'app/navigation/receptionnav';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CalendarComponent implements OnInit {
    actions: CalendarEventAction[];
    activeDayIsOpen: boolean;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    dialogRef: any;
    events: CalendarEvent[] = [];
    refresh: Subject<any> = new Subject();
    selectedDay: any;
    view: string;
    viewDate: Date;
    navigation: any;
    message: any;
    constructor(
        private _bookService: BookingService,
        public modal: MatDialog,
        private _baseService: BaseService,
        private _router: Router,
        public snackBar: MatSnackBar,
        private _fuseNavigationService: FuseNavigationService,
        private _fuseSidebarService: FuseSidebarService,
    ) {
        //  Get default navigation
        if (this._baseService.getUserData().role === 'Administrator') {
            this.navigation = navigation;
        }

        if (this._baseService.getUserData().role === 'Receptionist') {
            this.navigation = receptionNav;
        }
        // Set default navigation

        // Unregister navigation
        this._fuseNavigationService.unregister('setups');

        // Register the navigation to the service
        this._fuseNavigationService.register('setups', this.navigation);

        // Set the main navigation as our current navigation
        this._fuseNavigationService.setCurrentNavigation('setups');
        // Set the defaults
        this.view = 'month';
        this.viewDate = new Date();
        this.activeDayIsOpen = true;
        this.selectedDay = { date: startOfDay(new Date()) };
    }

    ngOnInit(): void {
        this.setEvents();
        this._bookService.currentMessage.subscribe(message => this.message = message);
    }

    refreshView(): void {
        this.refresh.next();
    }

    setEvents(): void {
        const nevent = new Array<any>();
        this._bookService.getEvents().subscribe(Cevent => {
            console.log('Calendar', Cevent);
            Cevent.forEach(element => {
                if (new Date(element.checkOutDateTime) < new Date())
                {
                    nevent.push({
                        start: new Date(
                            element.checkInDateTime
                        ),
                        end: new Date(element.checkOutDateTime),
                        title: `${element.room}, ${
                            element.guest
                            }`,
                        allDay: false,
                        color: {
                            primary: '#1976d2',
                            secondary: '#FAE3E3'
                        },
                        draggable: false,
                        meta: {
                            location: element.room,
                            notes: element.guest
                        }
                    });
                }
                else{
                    nevent.push({
                        start: new Date(
                            element.checkInDateTime
                        ),
                        end: new Date(element.checkOutDateTime),
                        title: `${element.room}, ${
                            element.guest
                            }`,
                        allDay: false,
                        color: {
                            primary: '#1976d2',
                            secondary: '#FAE3E3'
                        },
                        draggable: false,
                        meta: {
                            location: element.room,
                            notes: element.guest
                        },
                        // actions: [
                        //     {
                        //         label:
                        //             '<i class="material-icons s-16">edit</i>',
                        //         onClick: ({
                        //             event
                        //         }: {
                        //             event: CalendarEvent;
                        //         }): void => {
                        //             this.newMessage(element.id);
                        //             // console.log(
                        //             //     'Edit event',
                        //             //     event
                        //             // );
                        //         }
                        //     }
                        // ]
                    });
                }
            });
            this.events = nevent;
            this.refresh.next(true);
        });

    }

    newMessage(id): void {
        this._bookService.getBooking(id).subscribe(results => {
            if (results){
                // console.log('results', results);
                this._bookService.changeMessage({data: results, edit: true});
                this._router.navigate(['/app/bookings/book']);
            }
        });
    }

    beforeMonthViewRender({ header, body }): void {
        // console.info('beforeMonthViewRender');
        /**
         * Get the selected day
         */
        const _selectedDay = body.find(_day => {
            return _day.date.getTime() === this.selectedDay.date.getTime();
        });

        if (_selectedDay) {
            /**
             * Set selectedday style
             * @type {string}
             */
            _selectedDay.cssClass = 'mat-elevation-z3';
        }
    }

    dayClicked(day: CalendarMonthViewDay): void {
        const date: Date = day.date;
        const events: CalendarEvent[] = day.events;

        if (isSameMonth(date, this.viewDate)) {
            if (
                (isSameDay(this.viewDate, date) &&
                    this.activeDayIsOpen === true) ||
                events.length === 0
            ) {
                this.activeDayIsOpen = false;
            } else {
                this.activeDayIsOpen = true;
                this.viewDate = date;
            }
        }
        this.selectedDay = day;
        this.refresh.next();
    }

    eventTimesChanged({
        event,
        newStart,
        newEnd
    }: CalendarEventTimesChangedEvent): void {
        event.start = newStart;
        event.end = newEnd;
        // console.warn('Dropped or resized', event);
        this.refresh.next(true);
    }

    newBooking(): void{
        this._router.navigate(['/app/bookings/book']);
    }
}
