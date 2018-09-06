import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// Vendors
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { NgxErrorsModule } from '@ultimate/ngxerrors';
import { Angulartics2Module } from 'angulartics2';
import { LaddaModule } from 'angular2-ladda';
import { CookieModule } from 'ngx-cookie';
import { MomentModule } from 'ngx-moment';

// Options
import { LaddaOptions } from '@app/options';

// Providers
import { SharedProviders } from './shared.providers';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule,

        // Vendors
        NgbModule, // @ng-bootstrap/ng-bootstrap
        LoadingBarRouterModule, // @ngx-loading-bar/router
        NgxErrorsModule, // @ultimate/ngxerrors
        LaddaModule.forRoot(LaddaOptions), // angular2-ladda
        // Angulartics2Module, // angulartics2
        CookieModule, // ngx-cookie
        MomentModule, // ngx-moment
    ],
    declarations: [
        //
    ],
    exports: [

        // Angular
        CommonModule,
        RouterModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,

        // Vendors
        NgbModule, // @ng-bootstrap/ng-bootstrap
        LoadingBarRouterModule, // @ngx-loading-bar/router
        NgxErrorsModule, // @ultimate/ngxerrors
        LaddaModule, // angular2-ladda
        // Angulartics2Module, // angulartics2
        MomentModule, // ngx-moment
    ],
    providers: [SharedProviders]
})
export class SharedModule {
    //
}
