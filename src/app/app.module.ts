import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Modules
import { LayoutsModule } from './layouts/layouts.module';
import { CoreModule } from './modules/core/core.module';
import { SharedModule } from './modules/shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';

// Providers
import { AppProviders } from './app.providers';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        LayoutsModule,
        CoreModule,
        SharedModule,
        AppRoutingModule,
    ],
    declarations: [AppComponent],
    providers: [AppProviders],
    bootstrap: [AppComponent]
})
export class AppModule {
    //
}
