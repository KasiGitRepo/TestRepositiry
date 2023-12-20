/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-22-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import ACCOUNT_NAME from '@salesforce/schema/Account.Name'
import ACCOUNT_ANNUALREVENUE from '@salesforce/schema/Account.AnnualRevenue'
import ACCOUNT_OWNER from '@salesforce/schema/Account.Owner.Name'
export default class GetRecordData extends LightningElement {

    @api recordId
         name 
         annualRevenue 
         owner
         industry
         accountSource

    /*
       // Get record by Fields
    @wire(getRecord, {
        recordId: '$recordId',
        fields: [ACCOUNT_NAME, ACCOUNT_ANNUALREVENUE, ACCOUNT_OWNER]
    })
    accountHandler({ data }) {
        if (data) {
            console.log(data)
            this.name = data.fields.Name.displayValue ? data.fields.Name.displayValue : data.fields.Name.value
            this.annualRevenue = data.fields.AnnualRevenue.displayValue ? data.fields.AnnualRevenue.displayValue : data.fields.AnnualRevenue.value
            this.owner = data.fields.Owner.displayValue ? data.fields.Owner.displayValue : data.fields.Owner.value
            this.industry = data.fields.Industry.displayValue ? data.fields.Industry.displayValue : data.fields.Industry.value
            this.accountSource = data.fields.AccountSource.displayValue ? data.fields.AccountSource.displayValue : data.fields.AccountSource.value
        }
    }
    */

    //Get record by layoutType and mode
    @wire(getRecord, {recordId:'$recordId', layoutTypes:['Full'], modes:['View'] })
    accountHandlers({ data }) {
        if (data) {
         //   console.log(data)
            this.name = data.fields.Name.displayValue ? data.fields.Name.displayValue : data.fields.Name.value
            this.annualRevenue = data.fields.AnnualRevenue.displayValue ? data.fields.AnnualRevenue.displayValue : data.fields.AnnualRevenue.value
            this.owner = data.fields.Owner.displayValue ? data.fields.Owner.displayValue : data.fields.Owner.value
            this.industry = data.fields.Industry.displayValue ? data.fields.Industry.displayValue : data.fields.Industry.value
            this.accountSource = data.fields.AccountSource.displayValue ? data.fields.AccountSource.displayValue : data.fields.AccountSource.value
        }
    }
}