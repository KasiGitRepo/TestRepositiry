/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-15-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation'
export default class NavigateToRecordRelationshipPage extends NavigationMixin(LightningElement) {

    handleRelationshipPage() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordRelationshipPage',
            attributes: {
                 recordId:'0015j000014LtORAA0',
                 objectApiName:'Account',
                 relationshipApiName:'Contacts',
                 actionName:'view'
            }
        })
    }
}