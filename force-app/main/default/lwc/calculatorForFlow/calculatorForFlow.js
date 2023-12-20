/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 12-12-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement, api } from 'lwc';
import { FlowAttributeChangeEvent } from 'lightning/flowSupport';
export default class CalculatorForFlow extends LightningElement {
    @api inputNumber1 = "";
    @api inputNumber2 = "";
    @api outputResult = "";
    clickHandler(event) {
        let name = event.target.name;
        if (name === "add") {
            this.outputResult = Number(this.inputNumber1) + Number(this.inputNumber2);
        } else if (name === "sub") {
            this.outputResult = this.inputNumber1 - this.inputNumber2;
        } else if (name === "mul") {
            this.outputResult = this.inputNumber1 * this.inputNumber2;
        } else if (name === "div") {
            this.outputResult = this.inputNumber1 / this.inputNumber2;
        }

        const attributeChangeEvent = new FlowAttributeChangeEvent("outputResult", this.outputResult);
        this.dispatchEvent(attributeChangeEvent);
    }
}