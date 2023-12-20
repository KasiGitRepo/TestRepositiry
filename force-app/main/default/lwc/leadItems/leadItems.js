/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 10-19-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement, api } from 'lwc';

export default class LeadItems extends LightningElement {

    @api lead;

    clickHandler(event) {

        event.preventDefault();

        const sampleevent = new CustomEvent("selection", {
            detail: this.lead.Id
        });
        this.dispatchEvent(sampleevent);
    }
}