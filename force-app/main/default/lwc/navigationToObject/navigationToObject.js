/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-15-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement } from 'lwc';
import {NavigationMixin} from 'lightning/navigation'
export default class NavigationToObject extends NavigationMixin(LightningElement) {

     handleNavigationToObject(){
        this[NavigationMixin.Navigate]({
            type:'standard__objectPage',
            attributes:{
                objectApiName :'Opportunity',
                actionName:'new'
            }
        })
     }
}