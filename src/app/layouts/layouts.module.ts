import { NgModule } from '@angular/core';

// Modules
import { CoreModule } from '@app/modules/core/core.module';
import { SharedModule } from '@app/modules/shared/shared.module';

// Components
import { BlankLayoutComponent } from './blank';
import { NormalLayoutComponent } from './normal';

@NgModule({
	imports: [
        CoreModule,
        SharedModule,
    ],
	declarations: [
        BlankLayoutComponent,
        NormalLayoutComponent,
    ],
    providers: []
})
export class LayoutsModule {
	//
}
