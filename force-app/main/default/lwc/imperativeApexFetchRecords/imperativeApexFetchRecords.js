/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 12-05-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement, wire } from 'lwc';
import fetchAccountRecordsbyFilter from '@salesforce/apex/apexLWCAccountController.fetchAccountRecordsbyFilter';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import ACCOUNT_INDUSTRY from '@salesforce/schema/Account.Industry';
export default class ImperativeApexFetchRecords extends LightningElement {
    data = [];
    columns = [
        { label: 'Account Name', fieldName: 'Name' },
        { label: 'Industry', fieldName: 'Industry' },
        { label: 'Rating', fieldName: 'Rating' },
        { label: 'Type', fieldName: 'Type' }
    ];
    selectedIndustry;
    options = [];

    @wire(getObjectInfo, { ObjectApiName: ACCOUNT_OBJECT })
    accountInfo;

    @wire(getPicklistValues, {
        recordTypeId: "$accountInfo.data.defaultRecordTypeId",
        fieldApiName: ACCOUNT_INDUSTRY
    }) industryPicklist;

    handleChange(event) {
        this.selectedIndustry = event.target.value;
    }

    apexHandler() {
        fetchAccountRecordsbyFilter({
            inputIndustry: this.selectedIndustry
        }).then(response => {
            console.log("Response", response);
            this.data = response;
        }).catch(error => {
            console.log("Error", JSON.stringify(error));
        });
    }
}