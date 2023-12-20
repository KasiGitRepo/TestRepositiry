/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-24-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement, wire } from 'lwc';
import OPPORTUNITY_OBJECT from '@salesforce/schema/Opportunity'
import { getListUi } from 'lightning/uiListApi';
import { updateRecord } from 'lightning/uiRecordApi';
const cols = [
    { label: 'Id', fieldName: 'Id' },
    { label: 'Name', fieldName: 'Name' },
    { label: 'StageName', fieldName: 'StageName' },
    { label: 'Close Date', fieldName: 'CloseDate', editable: 'true' },
    { label: 'Amount', fieldName: 'Amount', editable: "true" }
]
export default class UpdateRecordByWire extends LightningElement {
    columns = cols
    opportunities=[]
    draftValues = []
    //Get the data with the help of Listview
    @wire(getListUi,
        {
            objectApiName: OPPORTUNITY_OBJECT,
            listViewApiName: 'AllOpportunities'
        })
    listViewHandler({ data, error }) {
        if (data) {
            //Iterate the each record by map
            this.opportunities = data.records.records.map(item=>{
                return {
                    //Display the data in table
                    "Id": this.getValue(item, 'Id'),
                    "Name": this.getValue(item, 'Name'),
                    "StageName": this.getValue(item, 'StageName'),
                    "CloseDate": this.getValue(item, 'CloseDate'),
                    "Amount": this.getValue(item, 'Amount')
                }
            })           
        }
        if (error) {
            console.error(error)
        }
    }
    //Return the each field value
    getValue(data, field) {
        return data.fields[field].value
    }
   
    //Handle Save 
    handleSave(event){
        console.log(JSON.stringify(event.detail.draftValues))
        //Upate the field values
        const recordInputs = event.detail.draftValues.map(draft=>{
            //Update the fields for the record
            const fields = {...draft} // {"Amount":"100","Id":"0065j00001J7TLtAAN"}
            return {fields:fields}
    })
       //Update each record on any field
       const promises = recordInputs.map(recordInput=>updateRecord(recordInput))
         //After update all records
         Promise.all(promises).then(()=>{  //Success
           console.log('Contact record updated successfully')
           //Empty the defaultValues
           this.draftValues=[] 
         }).catch(error=>{ //Error 
            console.error(error)
         })
     }
}