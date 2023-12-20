/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-13-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement, api , wire} from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account'
import NAME_FIELD from '@salesforce/schema/Account.Name'
import PHONE_FIELD from '@salesforce/schema/Account.Phone'
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry'
import RATING_FIELD from '@salesforce/schema/Account.Rating'
import OWNERSHIP_FIELD from '@salesforce/schema/Account.Ownership'
import ANNUALREVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue'

export default class RecordForm extends LightningElement {

 @api recordId
 @api objectApiName

 @wire(getObjectInfo, {objectApiName: ACCOUNT_OBJECT})
 objectInfo;

    get accountRecordTypeId(){
      if(this.objectInfo.data){
        const recTypes = this.objectInfo.data.recordTypeInfos;
        return Object.keys(recTypes).find(recTyp => recTypes[recTyp].name === 'Record_Type_B');
      } else {
        return null;
      }
    }
     
     object = ACCOUNT_OBJECT
     fields = [NAME_FIELD, PHONE_FIELD, INDUSTRY_FIELD, RATING_FIELD, OWNERSHIP_FIELD, ANNUALREVENUE_FIELD]

      

}