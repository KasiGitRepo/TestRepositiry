/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 10-20-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement } from 'lwc';

const columns = [
    { label: 'Name', fieldName: 'Name', editable: true },
    { label: 'Email', fieldName: 'Email', type: 'email', editable: true },
    { label: 'Phone', fieldName: 'Phone', type: 'phone', editable: true },
    { label: 'LeadSource', fieldName: 'LeadSource', type: 'text', editable: true },
    { label: 'Title', fieldName: 'Title', type: 'text', editable: true }
];

export default class C22pParent extends LightningElement {

    contactData;
    columns = columns;

    inputDataHandler(event) {
        this.contactData = event.detail;
    }
}