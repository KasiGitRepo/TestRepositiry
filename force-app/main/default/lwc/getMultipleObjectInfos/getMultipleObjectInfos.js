/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-21-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement , wire} from 'lwc';
//Import the objects from schema package
import ACCOUNT_NAME from '@salesforce/schema/Account'
import OPPORTUNITY_NAME from '@salesforce/schema/Opportunity'
//Import the wire adaptor
import { getObjectInfos } from 'lightning/uiObjectInfoApi';
export default class GetMultipleObjectInfos extends LightningElement {

 // Map the Object Names to the attribute
 objectApiNames = [ACCOUNT_NAME, OPPORTUNITY_NAME]

 objectData
 
 // make the objectApiNames as reactive, when the data is available it will fetch
 @wire(getObjectInfos, {objectApiNames: '$objectApiNames'})
 objectInformationHandler({data,error}){
    if(data){
        //assign the data to the property
        this.objectData = data
    } 
 }
}