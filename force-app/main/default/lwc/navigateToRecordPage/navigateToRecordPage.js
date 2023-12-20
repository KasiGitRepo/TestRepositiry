/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-15-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement, api } from 'lwc';
import {NavigationMixin} from 'lightning/navigation'
export default class NavigateToRecordPage extends NavigationMixin(LightningElement) {

    @api recordId 

    handleViewRecordPage(){
        this[NavigationMixin.Navigate]({
            type:'standard__recordPage',
            attributes:{
                recordId: '0065j00001LHLbGAAX',
                objectApiName:'Opportunity',
                actionName:'view'
            }
        })
    }

    handleEditRecordPage(){
        this[NavigationMixin.Navigate]({
            type:'standard__recordPage',
            attributes:{
                recordId: '0065j00001LHLbGAAX',
                objectApiName:'Opportunity',
                actionName:'edit'
            }
        })
    }
}