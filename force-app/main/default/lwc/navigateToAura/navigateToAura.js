/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-16-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement } from 'lwc';
import{ NavigationMixin } from 'lightning/navigation'
export default class NavigateToAura extends NavigationMixin(LightningElement) {

     handleNavigation(){

        this[NavigationMixin.Navigate]({
               type:'standard__component',
               attributes:{
                componentName:'c__NavigationAura'
               },
               state:{
                "c__id":'4324362642863'
               }
        })
     }
}