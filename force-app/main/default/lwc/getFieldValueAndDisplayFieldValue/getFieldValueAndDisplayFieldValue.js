/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-21-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue, getFieldDisplayValue } from 'lightning/uiRecordApi'
import ACCOUNT_NAME from '@salesforce/schema/Account.Name'
import ACCOUNT_ANNUALREVENUE from '@salesforce/schema/Account.AnnualRevenue'
import ACCOUNT_OWNER from '@salesforce/schema/Account.Owner.Name'
import ACCOUNT_INDUSTRY from '@salesforce/schema/Account.Industry'
import ACCOUNT_ACCOUNTSOURCE from '@salesforce/schema/Account.AccountSource'
export default class GetFieldValueAndDisplayFieldValue extends LightningElement {

    @api recordId
    name
    annualRevenue
    owner
    industry
    accountSource
    accountAnnualRevenue

    @wire(getRecord, {
        recordId: '$recordId',
        fields: [ACCOUNT_NAME, ACCOUNT_ANNUALREVENUE, ACCOUNT_OWNER,
                   ACCOUNT_INDUSTRY, ACCOUNT_ACCOUNTSOURCE]
    })
    filedsHandler({ data }) {
        if (data) {
            //Display value of the field
            this.name = getFieldValue(data, ACCOUNT_NAME)
            this.annualRevenue = getFieldValue(data, ACCOUNT_ANNUALREVENUE)
            this.owner = getFieldValue(data, ACCOUNT_OWNER)
            this.industry = getFieldValue(data, ACCOUNT_INDUSTRY)
            this.accountSource = getFieldValue(data, ACCOUNT_ACCOUNTSOURCE)
            // Display value of the Display value
            this.accountAnnualRevenue = getFieldDisplayValue(data, ACCOUNT_ANNUALREVENUE)
        }
    }
}