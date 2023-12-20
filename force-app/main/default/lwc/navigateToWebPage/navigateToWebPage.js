/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-16-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation'
export default class NavigateToWebPage extends NavigationMixin(LightningElement) {

    handleWebPage(){
        this[NavigationMixin.Navigate]({
            type:"standard__webPage",
            attributes:{
                url:"https://www.salesforcetroop.com"
            }
        })
    }
}