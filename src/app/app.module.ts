import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Vendors
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';

// Modules
import { LayoutsModule } from '@app/layouts/layouts.module';
import { CoreModule } from '@app/modules/core/core.module';
import { SharedModule } from '@app/modules/shared/shared.module';
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

        // Vendors
        // Angulartics2Module.forRoot([ Angulartics2GoogleAnalytics ]), // Angulartics
    ],
    declarations: [AppComponent],
    providers: [AppProviders],
    bootstrap: [AppComponent]
})
export class AppModule {
    //
}
