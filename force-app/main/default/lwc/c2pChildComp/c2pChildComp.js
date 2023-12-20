/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 10-20-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement } from 'lwc';

export default class C2pChildComp extends LightningElement {
    inputData;
    handleInput(event) {
        this.inputData = event.target.value;
        const eventTofire = new CustomEvent("eventfire", {
            detail: this.inputData
        });
        this.dispatchEvent(eventTofire);
    }
}