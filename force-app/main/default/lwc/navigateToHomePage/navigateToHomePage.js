/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-15-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement } from 'lwc';
//import { NavigationMixin }
import { NavigationMixin } from  'lightning/navigation'
//Wrap  NavigationMixin to the LightningELement 
export default class NavigateToHomePage extends  NavigationMixin(LightningElement) {

    handleNavigate(){
        this[NavigationMixin.Navigate]({
            // Page type
            type:'standard__namedPage',
            attributes:{
            // Where to navigate
                pageName:'home'
            }
        })
    }
}