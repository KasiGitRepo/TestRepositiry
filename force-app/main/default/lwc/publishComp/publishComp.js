/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 11-21-2023
 * @last modified by  : Kasi Jangiti
**/
// lmsPublisherWebComponent.js
import { LightningElement, wire } from 'lwc';
import getContactList from '@salesforce/apex/ContactController.getContactList';

// Import message service features required for publishing and the message channel
import { publish, MessageContext } from 'lightning/messageService';
import recordSelected from '@salesforce/messageChannel/SendContactData__c';

export default class PublishComp extends LightningElement {
    @wire(getContactList)
    contacts;

    @wire(MessageContext)
    messageContext;

    // Respond to UI event by publishing message
    selectionHandler(event) {

        const payload = { lmsData: event.target.contact.Id };

        publish(this.messageContext, recordSelected, payload);
    }
}