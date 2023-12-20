/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 10-08-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement, api } from 'lwc';

export default class ApiDecoratorChild extends LightningElement {

    @api getData;
    displayCourse;
    @api isBooleanValue = false; //Whenever we create a boolean variable, we need to initialize to understand the Js this is a boolean variable

    set certUpdate(value) {
        let clonedisplayCourse = { ...this.value };
        this.displayCourse = clonedisplayCourse.certificate.toUpperCase();
    }

    @api
    get certUpdate() {
        return this.displayCourse;
    }
}