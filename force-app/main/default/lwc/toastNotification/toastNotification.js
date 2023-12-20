/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-17-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement } from 'lwc';
//Import the 'ShowToastEvent' from the package
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
export default class ToastNotification extends LightningElement {

    successHandler() {
        this.showToastEvent("Opportunity!!", "{0} Record Created!! {1}", "success", "dismissable")
    }

    warningHandler() {
        this.showToastEvent("Opportunity!!", "Record Created!!", "warning", "sticky")
    }

    infoHandler() {
        this.showToastEvent("Opportunity!!", "Record Updated!!", "info", "pester")
    }

    errorHandler() {
        this.showToastEvent("Opportunity!!", "Record Creation Failed!!", "error")
    }

    //Create a standard event and call it in all the methods for re-usability
    showToastEvent(title, message, variant, mode) {
       //Create an event
       const event =  new ShowToastEvent({
          // the below are the attributes for an event
            title,
            message,
            variant,
            //We can pass the data.possible datatype are String and Object
            messageData:[
                'Salesforce', {
                    url:'http://www.salesforce.com',
                    label:'Click Here'
                }
            ],
            //possible ways to display the toast message on UI
            mode 
        })
          // Dispatch an event
          this.dispatchEvent(event)
    }
}