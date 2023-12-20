/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 10-13-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement, wire } from 'lwc';
import getOpportunities from '@salesforce/apex/OpportunityHandlerforWireProperty.getOpportunities'
const cols = [
    { "label": " Name", fieldName: "Name" },
    { "label": "Stage", fieldName: "StageName" },
    { "label": "Close Date", fieldName: "CloseDate", type: "date" },
    { "label": "Type", fieldName: "Type" },
    { "label": "Amount", fieldName: "Amount", type: "currency" }
];
export default class WirePropertyDataTable extends LightningElement {
    columns = cols;
    @wire(getOpportunities) opportunities;
}