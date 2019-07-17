import { BillingComponent } from './billing/billing.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
// tslint:disable-next-line: max-line-length
import { MatDialogModule, MatTooltipModule, MatFormFieldModule, MatInputModule, MatCardModule, MatSelectModule, MatSnackBarModule, MatPaginatorModule, MatSortModule, MatIconModule, MatTabsModule, MatBadgeModule, MatCheckboxModule, MatDatepickerModule, MatButtonModule, MatProgressSpinnerModule, MatTableModule, MatMenuModule } from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { NgArrayPipesModule } from 'ngx-pipes';

const routes: Routes = [];

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
        NgArrayPipesModule,
  ],
  declarations: [],
  entryComponents: []
})
export class FinancialModule { }
