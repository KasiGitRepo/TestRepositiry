/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 10-19-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement } from 'lwc';

export default class ChildCustomEvent extends LightningElement {

    handleClick(event) {
        let customevent = new CustomEvent("sampleevent", {
            detail: {
                "Name": "Kasi", "Age": 30
            }
        });
        this.dispatchEvent(customevent);
    }
}