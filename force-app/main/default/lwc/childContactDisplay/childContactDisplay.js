/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 10-20-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement, api } from 'lwc';

const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Title', fieldName: 'Title', type: 'text' },
    { label: 'Email', fieldName: 'Email', type: 'email' },
    { label: 'Lead Source', fieldName: 'LeadSource', type: 'text' },
];
export default class ChildContactDisplay extends LightningElement {

    @api contact;
    columns = columns;
}