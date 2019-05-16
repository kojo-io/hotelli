import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

// tslint:disable-next-line:max-line-length
import {
    MatButtonModule, MatIconModule, MatDialogModule, MatTooltipModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatSnackBarModule,
    MatCardModule, MatPaginatorModule, MatSortModule, MatTabsModule,
    MatBadgeModule, MatCheckboxModule, MatProgressSpinnerModule,
    MatTableModule,
    MatDatepickerModule,
} from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';
import { fuseConfig } from './fuse-config';

import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { AppRoutingModule } from './app-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpinterceptorService } from './utilities/httpinterceptor.service';
import { MomentModule } from 'ngx-moment';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        /* Angular modules */
        BrowserModule,
        BrowserAnimationsModule,
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
        MatDatepickerModule,
        MomentModule,
        TranslateModule.forRoot(),
        // NgPipesModule,

        /* Material moment date module */
        MatMomentDateModule,
        /* Material modules */
        MatIconModule, MatButtonModule, MatDialogModule, MatProgressSpinnerModule, MatPaginatorModule,
        MatFormFieldModule, MatInputModule, MatCardModule, MatTableModule, MatSortModule,

        /* Fuse modules */
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        TranslateModule.forRoot(),


        /* App modules */
        LayoutModule,
        AppRoutingModule
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpinterceptorService, multi: true },
    ],
    entryComponents: []
})
export class AppModule {
}
