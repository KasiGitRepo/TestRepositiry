/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-15-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement } from 'lwc';
import {NavigationMixin} from 'lightning/navigation'
import {encodeDefaultFieldValues} from 'lightning/pageReferenceUtils'
export default class NavigateToObjectDefault extends NavigationMixin(LightningElement) {

     handleDefautValues(){
       const defaultValue =  encodeDefaultFieldValues({
              Name:'Opportunity from Navigation',
              StageName:'Prospect',
              CloseDate:'12-10-2023',
              LeadSource:'Web',
              Amount:100000,
              Type:'New Customer'
        })

        this[NavigationMixin.Navigate]({
            type:'standard__objectPage',
            attributes:{
                objectApiName:'Opportunity',
                actionName:'new'
            },
             state:{
                 defaultFieldValues : defaultValue
             }
        })
     }
}