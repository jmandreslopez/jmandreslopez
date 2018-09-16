import { Injectable } from '@angular/core';
import * as _ from 'lodash';

// App
import { Config, Environment } from '@library/models';
// @ts-ignore: Dynamic path, check the project tsconfig file
import { config } from '@config';
// @ts-ignore: Dynamic path, check the project tsconfig file
import { environment } from '@environment';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    public config: Config = config;
    public environment: Environment = environment;

    //****************************************************************************************
    // CONFIG
    //****************************************************************************************

    /**
     * Description: Default config value
     *
     * @param {any} value
     * @param {any} backup
     * @return {any}
     */
    protected defaultConfig(key: any, backup: any): any {
        if (!_.isNil(this.config) && !_.isNil(key) && !_.isNil(this.config[key])) {
            return this.config[key];
        }
        else if (!_.isUndefined(backup)) {
            return backup;
        }

        throw new Error('Missing config variable - ' + key);
    }

    /**
     * ! Required
     * Description: Get human-readable, changeable App Title
     *
     * @return {string}
     */
    public getAppTitle(): string {
        return this.defaultConfig('app_title', undefined); // required
    }

    /**
     * ! Required
     * Description: Get App Description for metatags
     *
     * @return {string}
     */
    public getAppDescription(): string {
        return this.defaultConfig('app_description', undefined); // required
    }

    /**
     * ! Required
     * Description: Get App Image for metatags
     *
     * @return {string}
     */
    public getAppImageUrl(): string {
        return this.defaultConfig('app_image_url', undefined); // required
    }

    //****************************************************************************************
    // ENVIRONMENT
    //****************************************************************************************

    /**
     * Description: Default environment value
     *
     * @param {any} value
     * @param {any} backup
     * @return {any}
     */
    protected defaultEnvironment(key: any, backup: any): any {
        if (!_.isNil(this.environment) && !_.isNil(key) && !_.isNil(this.environment[key])) {
            return this.environment[key];
        }
        else if (!_.isUndefined(backup)) {
            return backup;
        }

        throw new Error('Missing environment variable - ' + key);
    }

    /**
     * Description: Check if the system is on debug mode
     *
     * @return {boolean}
     */
    public isDebug(): boolean {
        return this.defaultEnvironment('debug', false);
    }

    /**
     * Description: Get cookie name (Token name)
     *
     * @return {string}
     */
    public getCookieName(): string {
        return this.defaultEnvironment('cookie_name', 'jwt');
    }

    /**
     * Description: Get cookie domain
     *
     * @return {string}
     */
    public getCookieDomain(): string {
        return this.defaultEnvironment('cookie_domain', 'jmandreslopez.com');
    }
}
