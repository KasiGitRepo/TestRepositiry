/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 12-25-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement, wire, api } from 'lwc';
import fetchContactsForDataTable from '@salesforce/apex/ContactDataController.fetchContactsForDataTable';
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex'; //Refresh the LWC Component
const columns = [
    { label: "Full Name", fieldName: 'Name', type: 'text', editable: true },
    { label: "Account Name", fieldName: 'LastName', type: 'text', editable: true },
    { label: "Phone", fieldName: 'Phone', type: 'phone', editable: true },
    { label: "Email", fieldName: 'Email', type: 'email', editable: true },
    { label: "Lead Source", fieldName: 'LeadSource', type: 'text', editable: true }
];

export default class EditDataTableRows extends LightningElement {
    @api recordId;
    contactData = [];
    columns = columns;
    draftValues = [];
    contactsRefreshRecords;
    @wire(fetchContactsForDataTable, { accountId: "$recordId" })
    getContactoutput(result) {
        //Assign the data to the property
        this.contactsRefreshRecords = result;
        if (result.data) {
            this.contactData = result.data;
        } else if (result.error) {
            console.log("Data Table error", JSON.stringify(result.error));
        }
    }

    //onsvae handler(Calling update Record wire adaptor )
    async saveHandler(event) {
        //get the array of draft values from data table
        let records = event.detail.draftValues;

        //Iterate the array of draft values
        let updateRecordsArray = records.map((currentItem) => {
            let fieldInput = { ...currentItem };
            return {
                fields: fieldInput
            };
        });
        this.draftValues = []; // Make it as a empty

        //Iterate the records which are to be updated
        let recordToPromise = updateRecordsArray.map((currentItem) =>
            updateRecord(currentItem)); // Performed update operation
        await Promise.all(recordToPromise); // Calling Promise
        const toastEvent = new ShowToastEvent({
            title: "Success",
            message: "Records updated Successfully",
            variant: "success"
        });
        this.dispatchEvent(toastEvent);
        //Refreshing the Data Table with RefreshApex module
        await refreshApex(this.contactsRefreshRecords);
    }
}