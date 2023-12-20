/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-15-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation'
export default class NavigateToTab extends NavigationMixin(LightningElement) {

    handleTabPage() {
        this[NavigationMixin.Navigate]({
            type: 'standard__navItemPage',
            attributes: {
                // apiName is nothing but, where you want to navigate
                apiName: 'Life_Cycle_Hooks'
            }
        })
    }
}