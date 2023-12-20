/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 11-07-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement } from 'lwc';

export default class ChildComponentComposition extends LightningElement {

    fireHandler(event) {
        const myCustomEVent = new CustomEvent("customeventfire", {

        });

        this.dispatchEvent(myCustomEVent);
    }
}