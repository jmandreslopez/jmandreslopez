import { Injectable, OnInit, OnDestroy } from '@angular/core';
import * as _ from 'lodash';
import { Observable, Observer, Subscription } from 'rxjs';

// App
import { App } from '@library/models';

@Injectable({
    providedIn: 'root'
})
export class AppService implements OnInit, OnDestroy {
    protected subscriptions: Array<Subscription> = [];
    protected app: App;
    protected app$: Observable<App>;
    protected appObserver: Observer<App>;
    protected appVersion: string;
    protected appVersion$: Observable<string>;
    protected appVersionObserver: Observer<string>;

    constructor() {
        this.initObservables();
        this.bindObservables();

        // OnInit
        this.ngOnInit();
    }

    //****************************************************************************************
    // App: App
    //****************************************************************************************

    public getApp(): App {
        return this.app;
    }

    public setApp(app: App) {
        this.app = app;
        this.shareApp();
    }

    public hasApp(): boolean {
        return !_.isUndefined(this.getApp()) ? true : false;
    }

    protected shareApp() {
        if (!_.isUndefined(this.appObserver)) {
            this.appObserver.next(this.getApp());
        }
    }

    public cleanApp() {
        this.app = undefined;
    }

    protected destroyApp() {
        this.cleanApp();
        if (!_.isUndefined(this.appObserver)) {
            this.appObserver.complete();
        }
    }

    //****************************************************************************************
    // AppVersion: string
    //****************************************************************************************

    public getAppVersion(): string {
        return this.appVersion;
    }

    public setAppVersion(appVersion: string) {
        this.appVersion = appVersion;
        this.shareAppVersion();
    }

    public hasAppVersion(): boolean {
        return !_.isUndefined(this.getAppVersion()) ? true : false;
    }

    protected shareAppVersion() {
        if (!_.isUndefined(this.appVersionObserver)) {
            this.appVersionObserver.next(this.getAppVersion());
        }
    }

    public cleanAppVersion() {
        this.appVersion = undefined;
    }

    protected destroyAppVersion() {
        this.cleanAppVersion();
        if (!_.isUndefined(this.appVersionObserver)) {
            this.appVersionObserver.complete();
        }
    }

    //****************************************************************************************
    // OBSERVABLES
    //****************************************************************************************

    protected initObservables() {
        this.app$ = Observable.create((observer: any) => this.appObserver = observer).share();
        this.appVersion$ = Observable.create((observer: any) => this.appVersionObserver = observer).share();
    }

    protected bindObservables() {
        this.subscriptions.push(this.getAppObservable().subscribe((app: App) => this.onApp(app)));
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

    public getAppObservable(): Observable<App> {
        return this.app$;
    }

    public getAppVersionObservable(): Observable<string> {
        return this.appVersion$;
    }

    //****************************************************************************************
    // EVENTS
    //****************************************************************************************

    protected onApp(app: App) {
        if (!_.isUndefined(app)) {

            // App Version
            this.setAppVersion(app.version);
        }
    }

    //****************************************************************************************
    // METHODS
    //****************************************************************************************

    /**
     * Description: Inject app.json into the system
     *
     * @param {App} app
     */
    public injectApp(app: App) {
        this.setApp(app);
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
