/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-24-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement, wire } from 'lwc';
import fetchAccountsByType from '@salesforce/apex/apexLWCAccountController.fetchAccountsByType'
export default class ApexMethodWithParams extends LightningElement {
    //Once the page renders, it will display the records which are Type is empty.
    //If you select any value from the picklist(combo-box),the wire service will call and display the data who's type=selected value from the picklist
    selectedType = ''

    //Pass the parameter as reactive
    @wire(fetchAccountsByType, { type: '$selectedType' }) //Wire is a reactive
    accountTypes

    //Create a picklist values for combo box
    get accountTypeValues() {
        return [
            { label: 'Customer - Channel', value: 'Customer - Channel' },
            { label: 'Customer - Direct', value: 'Customer - Direct' },
            { label: 'Prospect', value: 'Prospect' },
            { label: 'Installation Partner', value: 'Installation Partner' }
        ]
    }

    //Assign the selected value to selectedType property
    handleChange(event) {
        this.selectedType = event.target.value
    }
}