/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-15-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation'
//Import 'encodeDefaultFieldValues' for default field values
import { encodeDefaultFieldValues } from 'lightning/pageReferenceUtils'
export default class NavigateToObjectDefaultValues extends NavigationMixin(LightningElement) {

    handleNavigationToObjectDefaultValues() {
        //Assign the default values to the fields 
        const defaultValue = encodeDefaultFieldValues({
            FirstName: 'Salesforce',
            LastName: 'LWC',
            LeadSource: 'Web',
            Phone: '7964796987946',
            Email: 'kasijangiti85@gmail.com'
        })
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Contact',
                actionName: 'new'
            },
            state: {
                defaultFieldValues: defaultValue
            }
        })
    }
}