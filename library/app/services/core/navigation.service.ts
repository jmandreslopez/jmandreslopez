import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationExtras, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

// App
import { HelpersService } from './helpers.service';
import { LoadingService } from './loading.service';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class NavigationService implements OnInit, OnDestroy {
    protected subscriptions: Array<Subscription> = [];

    constructor(protected router: Router,
                protected helpersService: HelpersService,
                protected loadingService: LoadingService,
                protected storageService: StorageService) {

        this.initObservables();
        this.bindObservables();

        this.ngOnInit();
    }

    //****************************************************************************************
    // OBSERVABLES
    //****************************************************************************************

    protected initObservables() {
        //
    }

    protected bindObservables() {
        this.subscriptions.push(this.router.events.pipe(filter((event: any) => event instanceof NavigationStart)).subscribe((navigationStartEvent: NavigationStart) => this.onNavigationStart(navigationStartEvent)));
        this.subscriptions.push(this.router.events.pipe(filter((event: any) => event instanceof NavigationEnd)).subscribe((navigationEndEvent: NavigationEnd) => this.onNavigationEnd(navigationEndEvent)));
        this.subscriptions.push(this.router.events.pipe(filter((event: any) => event instanceof NavigationCancel)).subscribe((navigationCancelEvent: NavigationCancel) => this.onNavigationCancel(navigationCancelEvent)));
        this.subscriptions.push(this.router.events.pipe(filter((event: any) => event instanceof NavigationError)).subscribe((navigationErrorEvent: NavigationError) => this.onNavigationError(navigationErrorEvent)));
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
            //
        }
    }

    protected onNavigationEnd(event: NavigationEnd) {
        if (!_.isUndefined(event)) {
            //
        }
    }

    protected onNavigationCancel(event: NavigationCancel) {
        if (!_.isUndefined(event)) {
             //
        }
    }

    protected onNavigationError(event: NavigationError) {
        if (!_.isUndefined(event)) {
            console.error(event);
        }
    }

    //****************************************************************************************
    // METHODS
    //****************************************************************************************

    public navigate(commands: Array<any>, extras?: NavigationExtras): Promise<boolean> {

        // Section available to inject middleware before the default
        // router naviagate functionality

        return this.router.navigate(commands, extras);
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
