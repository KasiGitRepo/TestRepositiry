/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 10-19-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement } from 'lwc';

export default class ParentCustomEvent extends LightningElement {

    displayMessage = false;

    Name;
    Age;

    handleEventfromChild(event) {
        this.displayMessage = !this.displayMessage;

        this.name = event.detail.Name;
        this.age = event.detail.Age;
    }
}