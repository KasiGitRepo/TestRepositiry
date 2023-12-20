/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 12-12-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement, api } from 'lwc';
//Import the event to let the flow to know whne property value change
import { FlowAttributeChangeEvent } from 'lightning/flowSupport';
export default class OutputToFlow extends LightningElement {

    @api inputText;

    changeHandler(event) {
        this.inputText = event.target.value;

        //Passing the value to Flow through an event
        const attributeChangeEvent = new FlowAttributeChangeEvent("inputText", this.inputText);
        this.dispatchEvent(attributeChangeEvent);
    }
}