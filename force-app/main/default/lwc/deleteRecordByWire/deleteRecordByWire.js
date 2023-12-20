/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-24-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement } from 'lwc';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
export default class DeleteRecordByWire extends LightningElement {

    recordId

    handleRecordId(event) {
        this.recordId = event.target.value
    }

    deleteHandler() {
        deleteRecord(this.recordId).then(() => {
            alert('Record was deleted successfully!!!!')
            this.showToast('Success', 'Record Deleted')
        }).catch(error => {
            //Error through toast message
            this.showToast('Error!!', error.body.message, 'error')
            //Display error dynamically
            alert('Error occured :' + JSON.stringify(error))
        })
    }

    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({
            title,
            message,
            variant: variant || 'success'
        }))
    }
}