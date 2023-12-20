/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-11-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement } from 'lwc';
import pubsub from 'c/pubsub'
export default class PubsubComponentB extends LightningElement {

    message
    
    // On load of the component subscribe the events 
    connectedCallback() {
        this.callbackHandler()
    }

    // Subscribe the event and display the message on the UI
    callbackHandler() {
        pubsub.subscribe('compA', (message) => {
            this.message = message
        })
    }
}