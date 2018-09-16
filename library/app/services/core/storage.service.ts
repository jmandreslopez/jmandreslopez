import { Injectable } from '@angular/core';
import * as _ from 'lodash';

// App
import { ConfigService } from '../config/config.service';
import { HelpersService } from './helpers.service';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor(protected configService: ConfigService,
                protected helpersService: HelpersService) {
        //
    }

    //****************************************************************************************
    // METHODS
    //****************************************************************************************

    /**
     * Description: Get Storage item by key
     *
     * Always using snake_case
     *
     * @param {string} key
     * @returns {string}
     */
    public getItem(key: string, remove: boolean = false): string {
        let item = localStorage.getItem(_.snakeCase(key));

        // Remove after
        if (remove) {
            this.removeItem(key);
        }

        return item;
    }

    /**
     * Description: Get all Storage items
     */
    public getAllItems() {
        return localStorage;
    }

    /**
     * Description: Set Storage item
     *
     * This method also check if the value is and
     * Object and handle that as a JSON (encoding it)
     * Always using snake_case
     *
     * @param {string} key
     * @param {any} value
     */
    public setItem(key: string, value: any) {

        // Parse Value and transform properly
        if (_.isObject(value)) {
            value = this.helpersService.encode(value);
        }
        else if (!_.isString(value)) {
            value = value.toString();
        }

        localStorage.setItem(_.snakeCase(key), value);
    }

    /**
     * Description: Check if Storage item exists
     *
     * @param {string} key
     * @return {boolean}
     */
    public hasItem(key: string): boolean {
        return !_.isNil(this.getItem(key));
    }

    /**
     * Description: Remove Storage item by key
     *
     * Always using snake_case
     *
     * @param {string} key
     */
    public removeItem(key: string) {
        localStorage.removeItem(_.snakeCase(key));
    }

    /**
     * Description: Remove all Storage items
     */
    public removeAllItems() {

        // Remove all items
        _.forEach(_.keys(this.getAllItems()), (key: string) => {
            this.removeItem(key);
        });

        // Double Tap
        localStorage.clear();
    }
}
