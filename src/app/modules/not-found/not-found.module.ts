import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from '../shared/shared.module';
import { NotFoundRoutingModule } from './not-found-routing.module';

// Components
import { NotFoundComponent } from './components';

// Providers
import { NotFoundProviders } from './not-found.providers';

@NgModule({
    imports: [
        SharedModule,
        NotFoundRoutingModule,
    ],
    declarations: [
        NotFoundComponent,
    ],
    providers: [NotFoundProviders]
})
export class NotFoundModule {
    //
}
