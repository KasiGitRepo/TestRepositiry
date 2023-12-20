/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-14-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement, wire} from 'lwc';
import SAMPLEMC from '@salesforce/messageChannel/SampleMessageChannel__c'
import { MessageContext, subscribe, unsubscribe, APPLICATION_SCOPE } from 'lightning/messageService';
export default class LwcComponentX extends LightningElement {

     @wire(MessageContext)
     context;
     
      receiveMessage
      
      connectedCallback(){

            this.subscriptionMessage()
      }

      subscriptionMessage(){
            //subscribe(messageContext, messageChannel, listener, subscriber options)
           subscribe(this.context, SAMPLEMC, (message) => {this.handleMessage(message)}, {scope:APPLICATION_SCOPE})
      }

      handleMessage(message){
            this.receiveMessage = message.lmsData.value? message.lmsData.value :"No Message Published"
      }

}