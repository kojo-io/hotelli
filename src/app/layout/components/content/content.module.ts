
import { FuseSharedModule } from '@fuse/shared.module';

import { ContentComponent } from 'app/layout/components/content/content.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        ContentComponent
    ],
    imports     : [
        RouterModule,
        FuseSharedModule,
    ],
    exports: [
        ContentComponent
    ]
})
export class ContentModule
{
}
