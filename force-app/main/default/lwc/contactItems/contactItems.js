/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 10-19-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement, api } from 'lwc';

export default class ContactItems extends LightningElement {

    @api contact;

    handleClick(event) {

        //Stop navigating to another page
        event.preventDefault();

        //Create custom event and store the Contact Id
        const selectionevent = new CustomEvent("selection", {
            detail: this.contact.Id
        });
        this.dispatchEvent(selectionevent);
    }
}