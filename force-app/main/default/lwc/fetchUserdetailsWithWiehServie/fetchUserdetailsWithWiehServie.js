/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-19-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement , wire} from 'lwc';
//import fields for object reference
import NAME_FIELD from '@salesforce/schema/User.Name'
import EMAIL_FIELD from '@salesforce/schema/User.Email'
import PHONE_FIELD from '@salesforce/schema/User.Phone'
import TITLE_FIELD from '@salesforce/schema/User.Title'
//import adapter to fetch the record details
import {getRecord} from 'lightning/uiRecordApi'
// import the Id field value from the User object
import ID from '@salesforce/user/Id'
//Create an array and put all the field reference
const fields = [NAME_FIELD, EMAIL_FIELD, PHONE_FIELD, TITLE_FIELD]
export default class FetchUserdetailsWithWiehServie extends LightningElement {

     userId = ID
     userDetails

     /*
       Wire function with hard coded fields (Never do this way)
     @wire(getRecord, {recordId:'0055j000008ourAAAQ', fields:['User.Name','User.Email', 'User.Phone', 'User.Title']})
      userFieldsHandler({data, error}){s
       */

         //wire as function
         // Instead of hard coding the fields,import the fields from the object referecne
        //'$userId' => wire as reactive
        @wire(getRecord, {recordId:'$userId', fields:fields})
        userFieldsHandler({data, error}){
        if(data){
            this.userDetails = data.fields
        }
        if(error){
            console.error(error)
        }
      }
      
      /*
      // For optimization
      @wire(getRecord, {recordId:'0055j000008ourAAAQ', fields:fields})
      userFieldsHandler({data, error}){
           (OR)
        // When left side and right side are same (fields = fields) => just mention fields like below when you specify the fields on top of the class
       @wire(getRecord, {recordId:'0055j000008ourAAAQ', fields})
         userFieldsHandler({data, error}){
      
       */

     // wire as property
     //'$userId' => wire as reactive
     @wire(getRecord,{recordId:'$userId', fields:[NAME_FIELD, EMAIL_FIELD, PHONE_FIELD, TITLE_FIELD]})
     userdetailsProeprty
}