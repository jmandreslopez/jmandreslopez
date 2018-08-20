import { Injectable } from '@angular/core';
import * as _ from 'lodash';

// App
import { Config, Environment } from '@app/models';
import { config } from '@config';
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
     * @param value: any
     * @param backup: any
     * @return any
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

    //****************************************************************************************
    // ENVIRONMENT
    //****************************************************************************************

    /**
     * Description: Default environment value
     *
     * @param value: any
     * @param backup: any
     * @return any
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
     * @return boolean
     */
    public isDebug(): boolean {
        return this.defaultEnvironment('debug', false);
    }

    /**
     * Description: Debug Level [all, warning, error, info]
     *
     * @return string
     */
    public getDebugLevel(): string {
        return this.defaultEnvironment('debug_level', 'none');
    }
}
