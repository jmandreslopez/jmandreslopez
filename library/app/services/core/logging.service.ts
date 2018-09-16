import { Injectable } from '@angular/core';
import * as _ from 'lodash';

// App
import { ConfigService } from '../config/config.service';

@Injectable({
    providedIn: 'root'
})
export class LoggerService {

    constructor(protected configService: ConfigService) {
        //
    }

    /**
     * Description: Print an info message
     *
     * @param {...Array<any>} args
     */
    public info(...args: Array<any>) {
        if (this.configService.isDebug()) {
            let element = ['%cInfo:', 'color:blue'];
            element.push(...args);
            console.log.apply(console, element);
        }
    }

    /**
     * Description: Print an error message
     *
     * @param {...Array<any>} args
     */
    public error(...args: Array<any>) {
        if (this.configService.isDebug()) {
            let element = ['%cError:', 'color:red'];
            element.push(...args);
            console.log.apply(console, element);
        }
    }

    /**
     * Description: Print a warning message
     *
     * @param {...Array<any>} args
     */
    public warning(...args: Array<any>) {
        if (this.configService.isDebug()) {
            let element = ['%cWarning:', 'color:orange'];
            element.push(...args);
            console.log.apply(console, element);
        }
    }

    /**
     * Description: Print error stack trace
     *
     * @param {string} message = ''
     */
    public printStackTrace(message = ''){
        let error = new Error(message);
        let stack = error.stack.replace(/^[^\(]+?[\n$]/gm, '')
            .replace(/^\s+at\s+/gm, '')
            .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@')
            .split('\n');

        console.error(message, stack);
    }
}
