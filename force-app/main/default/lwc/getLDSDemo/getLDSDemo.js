/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 10-14-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import OPPORTUNITY_NAME from '@salesforce/schema/Opportunity.Name';
import OPPORTUNITY_STAGE from '@salesforce/schema/Opportunity.StageName'
import OPPORTUNITY_CLOSEDATE from '@salesforce/schema/Opportunity.CloseDate'
import ACCOUNT_NAME from '@salesforce/schema/Opportunity.Account.Name';
import ANNUAL_REVENUE from '@salesforce/schema/Opportunity.Account.AnnualRevenue'

export default class GetLDSDemo extends LightningElement {

    @api recordId;
    oppName;
    oppStage;
    oppClosedate;
    accName;
    accRev;

    @wire(getRecord, {
        recordId: "$recordId", fields: [OPPORTUNITY_NAME, OPPORTUNITY_STAGE, OPPORTUNITY_CLOSEDATE, ACCOUNT_NAME, ANNUAL_REVENUE]
    }) outputFunction({ data, error }) {
        if (data) {
            this.oppName = data.fields.Name.value;
            this.oppStage = data.fields.StageName.value;
            this.oppClosedate = data.fields.CloseDate.value;

            console.log('data', data);
        } else if (error) {
            console.log('error', JSON.stringify(error));
        }
    }


}