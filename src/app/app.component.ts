import * as _ from 'lodash';
import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';

// Dependencies
const app = require('../../version.json');

@Component({
    selector: 'app-jmandreslopez',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    private subscriptions: Array<Subscription> = [];

    constructor(private elementRef: ElementRef) {
        this.bindObservables();
    }

    //****************************************************************************************
    // OBSERVABLES
    //****************************************************************************************

    private bindObservables() {
        //
    }

    private checkObservables() {
        //
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

    //

    //****************************************************************************************
    // METHODS
    //****************************************************************************************

    private setAppVersion() {
        const version = app.version;

        // Set AppVersion, this is a custom attribute
        if (!_.isUndefined(this.elementRef) && !_.isUndefined(this.elementRef.nativeElement)) {
            this.elementRef.nativeElement.setAttribute('app-version', version); // Version
        }
    }

    // ****************************************************************************************
    // LIFECYCLES
    // ****************************************************************************************

    public ngOnInit() {
        this.checkObservables();

        // AppVersion
        this.setAppVersion();
    }

    public ngOnDestroy() {
        this.destroyObservables();
    }
}
