/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 12-13-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class DisplayFlowsinVerticalTabset extends NavigationMixin(LightningElement) {

    @api recordId;

    //Pass the data to the Screen input field
    get inputVariable() {
        return [
            { name: 'varAccountId', type: 'String', value: this.recordId }
        ];
    }

    //When you click on Finish, this method will invoke
    statusChangeHandler(event) {
        if (event.detail.status === 'FINISHED') {
            this.showToastEvent("Success!!", "{0} Record Created!! {1}", "success", "dismissable");
        }
    }

    //Toast Message
    showToastEvent(title, message, variant, mode) {
        //Create an event
        const event = new ShowToastEvent({
            // the below are the attributes for an event
            title,
            message,
            variant,
            //We can pass the data.possible datatype are String and Object
            messageData: [
                'Salesforce', {
                    url: 'http://www.salesforce.com',
                    label: 'Click Here'
                }
            ],
            //possible ways to display the toast message on UI
            mode
        })
        // Dispatch an event
        this.dispatchEvent(event)
    }
}