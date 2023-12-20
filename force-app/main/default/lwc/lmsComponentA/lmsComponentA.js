/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-14-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement, wire } from 'lwc';

//Import messageChannel and file
import SAMPLEMC from '@salesforce/messageChannel/SampleMessageChannel__c'

//import MessageContext for data pass and publish the message
import { MessageContext, publish } from 'lightning/messageService';
export default class LmsComponentA extends LightningElement {

    inputValue

    @wire(MessageContext)
    context;

    inputHandler(event) {
        this.inputValue = event.target.value
    }

    handlePublish() {
        //Pass data by message property
        const message = {
            lmsData: {
                value:this.inputValue
            }
        }

        //publish the message
        publish(this.context, SAMPLEMC, message);
    }
}