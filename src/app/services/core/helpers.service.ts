import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as _ from 'lodash';

// App
import { ConfigService } from '../config/config.service';

// Dependencies
declare const document: any;
declare const window: any;
const { detect } = require('detect-browser');
const browser = detect();

@Injectable({
    providedIn: 'root'
})
export class HelpersService {

    constructor(protected configService: ConfigService) {
        //
    }

    /**
     * Description: Get high level document instance
     *
     * @returns {any}
     */
    public getDocument(): any {
        return document;
    }

    /**
     * Description: Get high level window instance
     *
     * @returns {any}
     */
    public getWindow(): any {
        return window;
    }

    /**
     * Description: Get current window location instance
     *
     * @returns {any}
     */
    public getLocation(): any {
        return this.getWindow().location;
    }

    /**
     * Description: Get current window location URL
     *
     * @returns {string}
     */
    public getLocationURL(): string {
        return this.getLocation().href;
    }

    /**
     * Description: Get Browser returned by the
     * detect-browser library
     *
     * @returns {any}
     */
    public getBrowser(): any {
        return browser; // detect-browser library
    }

    /**
     * Description: Encode element
     *
     * @param {any} element
     * @return {string}
     */
    public encode(element: any): string {
        return JSON.stringify(element);
    }

    /**
     * Description: Decode element
     *
     * @param {string} element
     * @return {any}
     */
    public decode(element: string): any {
        return JSON.parse(element);
    }

    /**
     * Description: Check if a form is valid, otherwise
     * trigger all the controls to show erros
     *
     * @param {FormGroup} form
     * @param {boolean} valid
     * @return {boolean}
     */
    public isFormValid(form: FormGroup): boolean {
        if (!_.isUndefined(form)) {

            // If the form is valid, continue
            if (!_.isUndefined(form.valid) && form.valid) {
                return true;
            }

            // Mark all controls as touched, this triggers the validation
            _.forEach(form.controls, (control: FormControl) => {
                if (control instanceof FormGroup) {
                    _.forEach(control.controls, (subcontrol: FormControl) => subcontrol.markAsTouched());
                }
                else {
                    control.markAsTouched();
                }
            });
        }

        return false;
    }
}
