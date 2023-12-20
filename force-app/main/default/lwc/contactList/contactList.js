/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 11-21-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import recordSelected from '@salesforce/messageChannel/SendContactRecord__c';
import getContactList from '@salesforce/apex/ContactController.getContactList';

export default class ContactList extends LightningElement {
    selectedRecord;
    @wire(getContactList) contacts;

    @wire(MessageContext)
    messageContext;

    selectionHandler(event) {
        let selectedId = event.detail;

        this.selectedRecord = this.contacts.data.find((currentItem) => currentItem.Id === selectedId);

        const payload = { lmsData: this.selectedRecord };
        publish(this.messageContext, recordSelected, payload);
    }
}