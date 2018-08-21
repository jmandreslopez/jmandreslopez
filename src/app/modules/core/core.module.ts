import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from '../shared/shared.module';

// Components
import { HeaderComponent } from './components';
import { FooterComponent } from './components';
import { LoadingComponent } from './components';

// Providers
import { CoreProviders } from './core.providers';

@NgModule({
    imports: [
        SharedModule,
    ],
    declarations: [
        HeaderComponent,
        FooterComponent,
        LoadingComponent,
    ],
    exports: [

        // Components
        HeaderComponent,
        FooterComponent,
        LoadingComponent,
    ],
    providers: [CoreProviders]
})
export class CoreModule {
    //
}
