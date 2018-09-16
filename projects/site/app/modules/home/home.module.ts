import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from '../shared/shared.module'; // No barrel
import { HomeRoutingModule } from './home-routing.module';

// Components
import { HomeComponent } from './components';

// Providers
import { HomeProviders } from './home.providers';

@NgModule({
    imports: [
        SharedModule,
        HomeRoutingModule,
    ],
    declarations: [
        HomeComponent,
    ],
    providers: [HomeProviders]
})
export class HomeModule {
    //
}
