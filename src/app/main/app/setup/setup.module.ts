import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetupComponent } from './setup.component';
import { BranchInfoComponent } from './branch-info/branch-info.component';
import { HttpClientModule } from '@angular/common/http';
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
    MatMenu,
    MatMenuModule,
    MatDatepickerModule,
    MatRippleModule
} from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { FuseSharedModule } from '@fuse/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ListbranchComponent } from './branch-info/tabs/listbranch/listbranch.component';
import { NewBranchComponent } from './branch-info/tabs/new-branch/new-branch.component';
import { RoomtypeComponent } from './roomtype/roomtype.component';
import { NewRoomtypeComponent } from './roomtype/tabs/new-roomtype/new-roomtype.component';
import { ListRoomtypeComponent } from './roomtype/tabs/list-roomtype/list-roomtype.component';
import { RoompriceComponent } from './roomprice/roomprice.component';
import { ListRoompriceComponent } from './roomprice/tabs/list-roomprice/list-roomprice.component';
import { NewRoompriceComponent } from './roomprice/tabs/new-roomprice/new-roomprice.component';
import { AmenitiesComponent } from './amenities/amenities.component';
import { ListAmenityComponent } from './amenities/tabs/list-amenity/list-amenity.component';
import { NewAmenityComponent } from './amenities/tabs/new-amenity/new-amenity.component';
import { RoomsComponent } from './rooms/rooms.component';
import { ListRoomsComponent } from './rooms/tabs/list-rooms/list-rooms.component';
import { NewRoomComponent } from './rooms/tabs/new-room/new-room.component';
import { RoomamenityComponent } from './rooms/tabs/modal/roomamenity/roomamenity.component';
import { HotelComponent } from './hotel/hotel.component';
import { TaxsetupComponent } from './taxsetup/taxsetup.component';
import { FacilityComponent } from './facility/facility.component';
import { FacilityTypeComponent } from './facility-type/facility-type.component';
import { SupplierComponent } from './supplier/supplier.component';
import { NewsupplierComponent } from './supplier/newsupplier/newsupplier.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: SetupComponent
            },
            {
                path: 'branches',
                component: BranchInfoComponent
            },
            {
                path: 'roomtype',
                component: RoomtypeComponent
            },
            {
                path: 'roomprice',
                component: RoompriceComponent
            },
            {
                path: 'amenities',
                component: AmenitiesComponent
            },
            {
                path: 'rooms',
                component: RoomsComponent
            },
            {
                path: 'hotelinfo',
                component: HotelComponent
            },
            {
                path: 'taxsetup',
                component: TaxsetupComponent
            },
            {
                path: 'facilityType',
                component: FacilityTypeComponent
            },
            {
                path: 'facility',
                component: FacilityComponent
            },
            {
                path: 'supplier',
                component: SupplierComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
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
        MatMenuModule,
        FuseSharedModule,
        MatRippleModule
    ],
    entryComponents: [RoomamenityComponent, NewsupplierComponent],
    declarations: [
        SetupComponent,
        BranchInfoComponent,
        ListbranchComponent,
        NewBranchComponent,
        RoomtypeComponent,
        NewRoomtypeComponent,
        ListRoomtypeComponent,
        RoompriceComponent,
        ListRoompriceComponent,
        NewRoompriceComponent,
        AmenitiesComponent,
        ListAmenityComponent,
        NewAmenityComponent,
        RoomsComponent,
        ListRoomsComponent,
        NewRoomComponent,
        RoomamenityComponent,
        HotelComponent,
        TaxsetupComponent,
        FacilityComponent,
        FacilityTypeComponent,
        SupplierComponent,
        NewsupplierComponent
    ]
})
export class SetupModule {}
