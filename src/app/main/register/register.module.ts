import { RegisterComponent } from './register.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatSnackBarModule, MatProgressBarModule, MatSelectModule } from '@angular/material';


const routes = [
    {
        path: '',
        component: RegisterComponent
    }
];
@NgModule({
  imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule,
        MatProgressBarModule,
        MatSelectModule,
        FuseSharedModule
  ],
  declarations: [
      RegisterComponent
  ]
})
export class RegisterModule { }
