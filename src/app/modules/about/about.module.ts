import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from '../shared/shared.module';
import { AboutRoutingModule } from './about-routing.module';

// Components
import { AboutComponent } from './components';

// Providers
import { AboutProviders } from './about.providers';

@NgModule({
    imports: [
        SharedModule,
        AboutRoutingModule,
    ],
    declarations: [
        AboutComponent,
    ],
    providers: [AboutProviders]
})
export class AboutModule {
    //
}
