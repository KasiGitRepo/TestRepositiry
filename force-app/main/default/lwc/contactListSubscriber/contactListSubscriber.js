/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 11-21-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement, wire } from 'lwc';
import {
    subscribe,
    MessageContext,
    unsubscribe,
    APPLICATION_SCOPE
} from 'lightning/messageService';
import recordSelected from '@salesforce/messageChannel/SendContactRecord__c';
export default class ContactListSubscriber extends LightningElement {

    selectedRecord;
    subscription = null;

    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    subscribeToMessageChannel() {
        if (!this.subscription) {
            this.subscription = subscribe(this.messageContext,
                recordSelected,
                (message) => this.handleMessage(message),
                { SCOPE: APPLICATION_SCOPE }
            )
        }
    }

    handleMessage(message) {
        this.selectedRecord = message.lmsData;
    }

    disconnectedCallback() {
        this.unsubscribeToMessageChannel();
    }

    unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }
}