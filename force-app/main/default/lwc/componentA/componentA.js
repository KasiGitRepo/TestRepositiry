/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-15-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement, wire } from 'lwc';
import SAMPLEMC from '@salesforce/messageChannel/CustomMessageChannel__c'
import { MessageContext, publish } from 'lightning/messageService';
export default class ComponentA extends LightningElement {

     inputData 

    @wire(MessageContext)
    context;
    
    handleInput(event){ 
      this.inputData = event.target.value
    }

    publishMessage(){

        const message={
            lmsDatapass:{
                value:this.inputData
            }
         }

        publish(this.context, SAMPLEMC, message)
    }
}