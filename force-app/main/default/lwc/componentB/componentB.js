/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-15-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement, wire } from 'lwc';
import SAMPLEMC from '@salesforce/messageChannel/CustomMessageChannel__c'
import { MessageContext, subscribe, APPLICATION_SCOPE } from 'lightning/messageService';
export default class ComponentB extends LightningElement {

     receivedMessage

     @wire(MessageContext)
     context

     connectedCallback(){ 
        this.subscribeMessage()
     }

     subscribeMessage(){
        subscribe(this.context, SAMPLEMC, (message) => {this.handleMessage(message)}, {scope:APPLICATION_SCOPE})
     }

     handleMessage(message){
         this.receivedMessage = message.lmsDatapass.value? message.lmsDatapass.value :"No Message Published from Component"
     }
}