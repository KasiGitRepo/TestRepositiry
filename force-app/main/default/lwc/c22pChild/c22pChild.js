/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 10-20-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement, wire } from 'lwc';
import conList from '@salesforce/apex/ContactController.conList';
export default class C22pChild extends LightningElement {

    @wire(conList) contacts;

    hanldeClick(event) {
        const eventTofire = new CustomEvent("passdata", {
            detail: this.contacts.data
        });
        this.dispatchEvent(eventTofire);
    }
}