/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-14-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement, api } from 'lwc';
// Import Toast event from lightning
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

//Import object from Salesforce schema
import OPPORTUNITY_OBJECT from '@salesforce/schema/Opportunity'

//Import fields from salesforce schema
import NAME_FIELD from '@salesforce/schema/Opportunity.Name'
import STAGENAME_FIELD from '@salesforce/schema/Opportunity.StageName'
import CLOSEDATE_FIELD from '@salesforce/schema/Opportunity.CloseDate'
import AMOUNT_FIELD from '@salesforce/schema/Opportunity.Amount'
import ACCOUNTID_FIELD from '@salesforce/schema/Opportunity.AccountId'
import LEADSOURCE_FIELD from '@salesforce/schema/Opportunity.LeadSource'
import TYPE_FIELD from '@salesforce/schema/Opportunity.Type'
import OPP_AMOUNT__C_FIELD from '@salesforce/schema/Opportunity.Opp_Amount__c'



export default class RecordFormOpportunity extends LightningElement {

    // If you want to pass recordId and Object dynamically, create the below properties
    @api recordId
    @api objectApiName

    object = OPPORTUNITY_OBJECT
    fields = [NAME_FIELD, STAGENAME_FIELD, CLOSEDATE_FIELD, AMOUNT_FIELD,
        ACCOUNTID_FIELD, LEADSOURCE_FIELD, TYPE_FIELD, OPP_AMOUNT__C_FIELD]

        //Toast Message
        successHandler(event){
          const myevent = new ShowToastEvent({
               title:"Opportunity is created",
               message:"Opportunity Record is created",
               variant:"success"
          }) 
          this.dispatchEvent(myevent)    
        }
}