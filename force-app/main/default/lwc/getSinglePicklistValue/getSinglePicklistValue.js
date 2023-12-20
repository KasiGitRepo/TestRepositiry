/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-21-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement, wire } from 'lwc';
//Import the object
import ACCOUNT_OBJECT from '@salesforce/schema/Account'
//Import the fields
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry'
import ACCOUNT_RATING from '@salesforce/schema/Account.Rating'
import OWNERSHIP_FIELD from '@salesforce/schema/Account.Ownership'
//Import the adapters
import { getPicklistValues, getObjectInfo } from 'lightning/uiObjectInfoApi';
export default class GetSinglePicklistValue extends LightningElement {

    selectedIndustry = ''
    selectedOwnership = ''
    selectedRating = ''
    ratingValues = []
    industryValues = []
    ownershipValues = []
    
    //To import the Account object metadata
    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    objectinfo

    // Industry Picklist
    //recordTypeId: '$objectinfo.data.defaultRecordTypeId'=> make this recordTypeId as reactive
    @wire(getPicklistValues, { recordTypeId: '$objectinfo.data.defaultRecordTypeId', fieldApiName: INDUSTRY_FIELD })
    industrypicklist({ data, error }) {
        if (data) {
            //Map this value to industry options and create a copy(don't want to update the filter)
            this.industryValues = [...this.generateIndustryPicklist(data)]
        }
    }
    
    //generate picklist values in the form of map and write in map format(label, value)
    //data.values is a object, iterate in the form of map(key, value) 
    generateIndustryPicklist(data) {
        return data.values.map(item => ({ label: item.label, value: item.value }))
    }

    handleChange(event) {
        this.selectedIndustry = event.detail.value;
    }

    //Ownership Picklist
    @wire(getPicklistValues, {recordTypeId:'$objectinfo.data.defaultRecordTypeId', fieldApiName:OWNERSHIP_FIELD})
    ownershipFunction({data,error}){
       if(data){
         this.ownershipValues = [...this.getOwnershipPicklist(data)]
       }
       if(error){
        console.error(error)
       }
    }

    getOwnershipPicklist(data){
        return data.values.map(item=>({label:item.label, value:item.value}))
    }

    handleType(event) {
        this.selectedOwnership = event.detail.value;
    }

    //Rating Picklist
    @wire(getPicklistValues, {recordTypeId:'$objectinfo.data.defaultRecordTypeId', fieldApiName:ACCOUNT_RATING})
    ratingFunction({data}){
         if(data){
            this.ratingValues = [...this.generateRatingValues(data)]
         }      
    }
    
    generateRatingValues(data){
        return data.values.map(item=>({label:item.label, value:item.value}))
    }

    handleRating(event){
       this.selectedRating = event.target.value
    }
}