/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 10-08-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement } from 'lwc';

export default class ConditionalRender extends LightningElement {
    displayMessage = false;

    changeHandler(event) {
        //toggleing
        this.displayMessage = !this.displayMessage;
    }
}