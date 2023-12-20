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
    { "label": "Opportunity Name", fieldName: "Name" },
    { "label": "Opportunity Stage", fieldName: "StageName" },
    { "label": "Opportunity Close Date", fieldName: "CloseDate", type: "date" },
    { "label": "Opportunity Type", fieldName: "Type" },
    { "label": "Opportunity Amount", fieldName: "Amount", type: "currency" }
];
export default class WireDecoratorWithFunction extends LightningElement {

    columns = cols;
    opportunities;
    @wire(getOpportunities)
    opportunityFunction({ data, error }) {
        if (data) {
            //  console.log("Data", data);
            let updatedOpps = data.map((currentItem) => {
                let oppRecord = {};
                if (!currentItem.hasOwnProperty("Type")) {
                    oppRecord = { ...currentItem, Type: "Prospecting" };
                } else {
                    oppRecord = { ...currentItem };
                }
                return oppRecord;
            });
            this.opportunities = updatedOpps;
            // console.log("updatedOpps", updatedOpps);
        } else {
            //  console.log("error", error);
        }
    }
}