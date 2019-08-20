import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MomentModule } from 'ngx-moment';

// tslint:disable-next-line:max-line-length

import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';
import { fuseConfig } from './fuse-config';

import { LayoutModule } from './layout/layout.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpinterceptorService } from './utilities/httpinterceptor.service';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// tslint:disable-next-line: max-line-length
import { MatDialogModule, MatTooltipModule, MatFormFieldModule, MatInputModule, MatCardModule, MatSelectModule, MatSnackBarModule, MatPaginatorModule, MatSortModule, MatIconModule, MatTabsModule, MatBadgeModule, MatCheckboxModule, MatDatepickerModule, MatButtonModule, MatProgressSpinnerModule, MatTableModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { AppsComponent } from './main/app/app.component';
import { DialogboxComponent } from './main/app/components/dialogbox/dialogbox.component';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
    declarations: [
        AppComponent,
        AppsComponent,
        DialogboxComponent,
        FlexLayoutModule

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
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
    ],
    entryComponents: [DialogboxComponent]
})
export class AppModule {
}
