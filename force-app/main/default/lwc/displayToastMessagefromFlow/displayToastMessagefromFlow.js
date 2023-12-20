/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 12-13-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class DisplayToastMessagefromFlow extends LightningElement {

    statusChangeHandler(event) {
        if (event.detail.status === "FINISHED") {
            const toastMessage = new ShowToastEvent({
                "title": 'Success',
                "message": 'Record Created Successfully',
                "variant": 'success'
            });
            this.dispatchEvent(toastMessage);
        }
    }
}