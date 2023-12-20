/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-11-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement } from 'lwc';
import pubsub from 'c/pubsub'
export default class PubsubComponentA extends LightningElement {

    message

    inputHandler(event) {
        this.message = event.target.value
    }

    // publish the event and message
    publishHandler() {
        pubsub.publish('compA', this.message)
    }

}