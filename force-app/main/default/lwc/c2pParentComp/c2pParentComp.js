/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 10-20-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement } from 'lwc';

export default class C2pParentComp extends LightningElement {
    dispayInput;

    dispayHandler(event) {
        this.dispayInput = event.detail;
    }
}