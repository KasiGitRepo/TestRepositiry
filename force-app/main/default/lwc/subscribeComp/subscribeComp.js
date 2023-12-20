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
    unsubscribe,
    MessageContext,
    APPLICATION_SCOPE
} from 'lightning/messageService';
import recordSelected from '@salesforce/messageChannel/SendContactData__c';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import NAME_FIELD from '@salesforce/schema/Contact.Name';
import TITLE_FIELD from '@salesforce/schema/Contact.Title';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import PHOTOURL_FIELD from '@salesforce/schema/Contact.PhotoUrl';

const fields = [
    NAME_FIELD,
    TITLE_FIELD,
    PHONE_FIELD,
    EMAIL_FIELD,
    PHOTOURL_FIELD,
];
export default class SubscribeComp extends LightningElement {
    contacts;
    recordId;
    recordData;
    subscription = null;
    @wire(getRecord, { recordId: '$recordId', fields })
    wiredRecords({ data, error }) {
        if (data) {
            this.contacts = data;
            console.log('Contacts data', this.contacts);
            fields.forEach(
                (item) => (this[item.fieldApiName] = getFieldValue(data, item))
            );
        } else if (error) {
            this.dispatchToast(error);
        }
    }

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
                { SCOPE: APPLICATION_SCOPE });
        }
    }

    handleMessage(message) {
        this.recordData = message.lmsData;
    }

    disconnectedCallback() {
        this.unsubscribeToMessageChannel();
    }

    unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    dispatchToast(error) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error loading contact',
                variant: 'error',
                message: reduceErrors(error).join(', ')
            })
        );
    }
}