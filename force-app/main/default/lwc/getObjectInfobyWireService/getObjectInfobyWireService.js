/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-19-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement , wire} from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import OBJECT_NAME from '@salesforce/schema/Account'

export default class GetObjectInfobyWireService extends LightningElement {
    
    objectName
    defaultRecordTypeId
    url
    @wire(getObjectInfo, {objectApiName : OBJECT_NAME})
    objectInfo({data,error}){
        if(data){
            //You can fetch all the metadata of an object
            this.objectName = data.apiName
            this.defaultRecordTypeId = data.defaultRecordTypeId
            this.url = data.themeInfo.iconUrl
            this.keyPrefix = data.keyPrefix
        }
      if(error){
        console.log(error)
      }     
    }

    @wire(getObjectInfo, {objectApiName : OBJECT_NAME})
    objectInfoData;
}