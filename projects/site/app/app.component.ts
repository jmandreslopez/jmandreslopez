import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';

// App
import { AppService, NavigationService } from '@library/services';

// Dependencies
const app = require('../app.json');

@Component({
    selector: 'ja-site',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    private subscriptions: Array<Subscription> = [];

    constructor(private elementRef: ElementRef,
                // private angulartics: Angulartics2GoogleAnalytics,
                private appService: AppService,
                private navigationService: NavigationService) {

        this.bindObservables();
    }

    //****************************************************************************************
    // OBSERVABLES
    //****************************************************************************************

    private bindObservables() {
        this.subscriptions.push(this.appService.getAppVersionObservable().subscribe((appVersion: string) => this.onAppVersion(appVersion)));
    }

    private checkObservables() {
        if (! this.appService.hasAppVersion()) {
            this.onAppVersion(this.appService.getAppVersion());
        }
    }

    private destroyObservables() {
        _.forEach(this.subscriptions, (subscription: Subscription) => {
            if (!_.isUndefined(subscription)) {
                subscription.unsubscribe();
            }
        });
    }

    //****************************************************************************************
    // EVENTS
    //****************************************************************************************

    private onAppVersion(appVersion: string) {
        if (!_.isUndefined(appVersion)) {

            // Set App Version, this is a custom attribute
            if (!_.isUndefined(this.elementRef) &&
                !_.isUndefined(this.elementRef.nativeElement)) {

                this.elementRef.nativeElement.setAttribute('app-version', appVersion);
            }
        }
    }

    //****************************************************************************************
    // METHODS
    //****************************************************************************************

    //

    // ****************************************************************************************
    // LIFECYCLES
    // ****************************************************************************************

    public ngOnInit() {
        this.checkObservables();

        // Inject App
        this.appService.injectApp(app);
    }

    public ngOnDestroy() {
        this.destroyObservables();
    }
}
