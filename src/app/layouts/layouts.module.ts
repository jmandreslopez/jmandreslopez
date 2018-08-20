import { NgModule } from '@angular/core';

// Modules
import { CoreModule } from '../modules';
import { SharedModule } from '../modules';

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
