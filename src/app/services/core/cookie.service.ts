import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';
import { CookieService as ExternalCookieService } from 'ngx-cookie';

// App
import { ConfigService } from '../config/config.service';

@Injectable({
    providedIn: 'root'
})
export class CookieService {

    constructor(protected cookieService: ExternalCookieService,
                protected configService: ConfigService) {
        //
    }

    //****************************************************************************************
    // METHODS
    //****************************************************************************************

    /**
     * Description: Get Cookie by name
     *
     * @param {string} name
     * @return {string}
     */
    public getCookie(name: string, remove: boolean = false): string {
        let cookie = this.cookieService.get(name);

        // Remove after
        if (remove) {
            this.deleteCookie(name);
        }

        return cookie;
    }

    /**
     * Description: Get all Cookies
     *
     * @returns {any}
     */
    public getAllCookies(): any {
        return this.cookieService.getAll();
    }

    /**
     * Description: Set Cookie
     *
     * @param {string} name
     * @param {string} value
     * @param {string|Date} expires
     */
    public setCookie(name: string, value: string, expires?: string|Date) {

        // Default expiration to a year from now
        if (_.isUndefined(expires)) {
            expires = moment().add(1, 'year').toDate();
        }

        this.cookieService.put(name, value, {
            expires: expires,
            domain: this.configService.getCookieDomain(),
            path: '/',
        });
    }

    /**
     * Description: Check if a Cookie exists
     *
     * @param {string} name
     * @return {boolean}
     */
    public hasCookie(name: string): boolean {
        return !_.isUndefined(this.getCookie(name)) ? true : false;
    }

    /**
     * Description: Delete Cookie by name
     *
     * @param {string} name
     */
    public deleteCookie(name: string) {
        if (this.hasCookie(name)) {
            this.cookieService.remove(name, {
                domain: this.configService.getCookieDomain(),
                path: '/',
            });
        }
    }

    /**
     * Description: Delete all Cookies
     */
    public deleteAllCookies() {

        // Delete all cookies
        // _.forEach(this.getAllCookies(), (value: any, name: any) => {
        //     this.deleteCookie(name);
        // });

        // Use the default library method instead
        this.cookieService.removeAll();
    }
}
