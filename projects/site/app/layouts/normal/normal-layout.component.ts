import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

// App
import { HelpersService } from '@library/services';
import { routeAnimations } from '@site/animations';

@Component({
    selector: 'ja-normal-layout',
    templateUrl: './normal-layout.component.html',
    styleUrls: ['./normal-layout.component.scss'],
    animations: [routeAnimations]
})
export class NormalLayoutComponent implements OnInit, OnDestroy {
    protected subscriptions: Array<Subscription> = [];
    @ViewChild('main') container: ElementRef;

    constructor(protected router: Router,
                protected helpersService: HelpersService) {

        this.bindObservables();
    }

    //****************************************************************************************
    // OBSERVABLES
    //****************************************************************************************

    protected bindObservables() {
        this.subscriptions.push(this.router.events.pipe(filter((event: any) => event instanceof NavigationStart)).subscribe((navigationStartEvent: NavigationStart) => this.onNavigationStart(navigationStartEvent)));
    }

    protected checkObservables() {
        //
    }

    protected destroyObservables() {
        _.forEach(this.subscriptions, (subscription: Subscription) => {
            if (!_.isUndefined(subscription)) {
                subscription.unsubscribe();
            }
        });
    }

    //****************************************************************************************
    // EVENTS
    //****************************************************************************************

    protected onNavigationStart(event: NavigationStart) {
        if (!_.isUndefined(event)) {

            // Force a scroll to top every time we navigate
            // this.helpersService.scrollElementToTop(this.container);
        }
    }

    //****************************************************************************************
    // LIFECYCLES
    //****************************************************************************************

    public ngOnInit() {
        this.checkObservables();
    }

    public ngOnDestroy() {
        this.destroyObservables();
    }
}
