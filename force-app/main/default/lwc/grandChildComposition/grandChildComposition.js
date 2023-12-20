/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 11-07-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement } from 'lwc';

export default class GrandChildComposition extends LightningElement {

    fireHandler(event) {
        //Create a custom event
        const myCustomEVent = new CustomEvent("customeventfire", {
            bubbles: true, composed: true // Special attributes to to get higer level in the component communication
        });

        this.dispatchEvent(myCustomEVent);
    }
}