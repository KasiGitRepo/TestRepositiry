/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-22-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement , wire} from 'lwc';
import { getListUi } from 'lightning/uiListApi';
import AMOUNT_FIELD from '@salesforce/schema/Opportunity.Amount'
import OPPORTUNITY_OBJECT from '@salesforce/schema/Opportunity'
export default class GetListofOpportunityRecords extends LightningElement {
    opportunities=[]
    pageToken = null
    nextPageToken= null
    previousPageToken = null
 @wire(getListUi, {objectApiName: OPPORTUNITY_OBJECT, 
    listViewApiName:'AllOpportunities',
    pageSize:10,
    sortBy:AMOUNT_FIELD,
    pageToken:'$pageToken'
   })
 opportunityListHandler({data}){
    if(data){
        console.log(data)
        this.opportunities = data.records.records
        this.nextPageToken = data.records.nextPageToken
        this.previousPageToken = data.records.previousPageToken
    }
 }

 handlePreviousPage(){
      this.pageToken = this.previousPageToken
 }

 handleNextPage(){
    this.pageToken =  this.nextPageToken
 }

}