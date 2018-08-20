import { Component, OnInit, OnDestroy } from '@angular/core';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';

// App
import { LoadingService } from '@app/services';

@Component({
    selector: 'jm-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy {
    protected subscriptions: Array<Subscription> = [];
    public loading: boolean = false;
    public loadingBarColor: string = '#22B797';

    constructor(protected loadingService: LoadingService) {
        this.bindObservables();
    }

    //****************************************************************************************
    // OBSERVABLES
    //****************************************************************************************

    protected bindObservables() {
        this.subscriptions.push(this.loadingService.getLoadingObservable().subscribe((loading: boolean) => this.onLoading(loading)));
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

    protected onLoading(loading: boolean) {
        this.loading = loading;
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
