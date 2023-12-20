/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 12-12-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement, api, track } from 'lwc';

export default class ObjectInputToLCWfromFlow extends LightningElement {

    //Whenever the property changes re-render the component.
    @track _contacts = [];

    //Setter to set the values
    set contacts(contacts = []) {
        this._contacts = [...contacts]; //copy of the records/object
    }

    //getter to display the values
    @api
    get contacts() {
        return this._contacts;
    }

    //Getter 
    // To iterate the array of records and display Email on UI
    get items() {
        //Iterate the array of records
        let objectData = this._contacts.map(currentItem => {
            return {
                type: 'icon',
                label: currentItem.Email,
                name: currentItem.Email,
                iconName: 'standard:contact',
                alternativeText: 'Contact Email',
            }
        });
        return objectData;
    }
}