/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 11-27-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement, api, wire } from 'lwc';
import fetchLookupData from '@salesforce/apex/CustomLookupController.fetchLookupData';
const DELAY = 300; //mili seconds
export default class MultiSelectCustomLookupFilter extends LightningElement {

    searchKey;
    @api ObjectApiName = "Account";
    @api objectLabel = "Account";
    @api placeHolder = "Search for Account";
    @api iconName = "standard:account";
    hasRecords = false;
    resultData = [];

    delayedTimeOut;


    @wire(fetchLookupData, { serachText: '$searchKey', ObjectApiName: '$ObjectApiName' })
    recordsList({ data, error }) {
        if (data) {
            console.log('Result Data', data);
            this.hasRecords = data.length > 0 ? true : false;
            this.resultData = data;
        } else if (error) {
            console.log('Error Message', error);
        }
    }

    changeHandler(event) {
        window.clearTimeout(this.delayedTimeOut);
        let value = event.target.value;
        this.delayedTimeOut = setTimeout(() => function () {
            this.searchKey = value;
        }, DELAY);
    }

    clickHandler(event) {
        let recordId = event.target.getAttribute("data.recid");
        console.log("recordId", recordId);
    }
}