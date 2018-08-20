import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import * as _ from 'lodash';
import { Observable, Observer, Subscription } from 'rxjs';

// App
import { ConfigService } from '../config/config.service';

@Injectable({
    providedIn: 'root'
})
export class LoadingService implements OnInit, OnDestroy {
    protected subscriptions: Array<Subscription> = [];
    protected loading: boolean;
    protected loading$: Observable<boolean>;
    protected loadingObserver: Observer<boolean>;
    protected forced: boolean = false;

    constructor(protected router: Router,
                protected configService: ConfigService) {

        this.initObservables();
        this.bindObservables();

        // Force Angular OnInit
        this.ngOnInit();
    }

    //****************************************************************************************
    // Loading: boolean
    //****************************************************************************************

    public getLoading(): boolean {
        return this.loading;
    }

    public setLoading(loading: boolean) {
        this.loading = loading;
        this.shareLoading();
    }

    public isLoading(): boolean {
        return this.getLoading() ? true : false;
    }

    protected shareLoading() {
        if (!_.isUndefined(this.loadingObserver)) {
            this.loadingObserver.next(this.getLoading());
        }
    }

    //****************************************************************************************
    // OBSERVABLES
    //****************************************************************************************

    protected initObservables() {
        this.loading$ = Observable.create((observer: any) => this.loadingObserver = observer).share();
    }

    protected bindObservables() {
        this.subscriptions.push(this.router.events.filter((event: any) => event instanceof NavigationStart).subscribe((navigationStartEvent: NavigationStart) => this.onNavigationStart(navigationStartEvent)));
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

    public getLoadingObservable(): Observable<boolean> {
        return this.loading$;
    }

    //****************************************************************************************
    // EVENTS
    //****************************************************************************************

    protected onNavigationStart(event: NavigationStart) {

        console.log('entro', this.configService.isDebug());

        // Only if Debug is enabled
        if (this.configService.isDebug()) {

            // Check for URL flag
            if (event.url.toLowerCase().includes('loading=true')) {
                this.show();
                this.forced = true; // Prevent Hidding
            }
        }
    }

    //****************************************************************************************
    // METHODS
    //****************************************************************************************

    public show() {
        if (this.getLoading() !== true && !this.forced) {
            this.setLoading(true);
        }
    }

    public hide() {
        if (this.getLoading() !== false && !this.forced) {
            this.setLoading(false);
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
