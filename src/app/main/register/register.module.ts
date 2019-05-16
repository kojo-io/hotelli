import { NgModule } from '@angular/core';
import { RegisterComponent } from './register.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatSnackBarModule, MatProgressBarModule, MatSelectModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';


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
