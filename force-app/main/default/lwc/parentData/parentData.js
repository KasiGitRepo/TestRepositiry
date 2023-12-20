/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 10-20-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement, wire } from 'lwc';
import getOppsList from '@salesforce/apex/OpportunityHandler.getOppsList';
export default class ParentData extends LightningElement {

    @wire(getOppsList) opps;

    connectedCallback() {
        if (this.opps.data) {
            console.log('Data received in parent component:', JSON.stringify(this.opps.data));
        }
    }
}