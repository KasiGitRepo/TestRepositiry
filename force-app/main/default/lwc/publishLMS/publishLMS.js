/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 11-21-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement, wire } from 'lwc';
// Import message service features required for publishing and the message channel
import { publish, MessageContext } from 'lightning/messageService';
import recordSelected from '@salesforce/messageChannel/sampleMessage__c';
export default class PublishLMS extends LightningElement {

    @wire(MessageContext)
    messageContext;

    // Respond to UI event by publishing message
    publishMessage(event) {
        const payload = { lmsData: 'This is the message coming from Message Channnel by the Publisher' };

        publish(this.messageContext, recordSelected, payload);
    }
}