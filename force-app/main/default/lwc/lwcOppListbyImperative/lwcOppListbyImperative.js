/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-25-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement } from 'lwc';
import getOpportunityList from '@salesforce/apex/OpportunityController.getOpportunityList'
export default class LwcOppListbyImperative extends LightningElement {

   opps
   
    handleOpps() {
        getOpportunityList().then(result => {
            console.log(result)
            this.opps = result
        }).catch(error => {
            console.error(error)
        })
    }
}