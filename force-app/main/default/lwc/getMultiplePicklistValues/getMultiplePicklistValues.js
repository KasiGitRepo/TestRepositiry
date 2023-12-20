/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-21-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement , wire} from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/Account'
import { getObjectInfo, getPicklistValuesByRecordType } from 'lightning/uiObjectInfoApi';
export default class GetMultiplePicklistValues extends LightningElement {

    //Properties
    selectedIndustry=''
    selectedRating=''
    selectedType = ''
    selectedSource = ''
    industryOptions = []
    ratingOptions= []
    typeOptions = []
    sourceOptions = []

     //Fetch the Object Metadata
     @wire(getObjectInfo, {objectApiName : ACCOUNT_OBJECT})
     objectInfo

    //Pass the recordTypeId from Object Metadata
     @wire(getPicklistValuesByRecordType, {objectApiName:ACCOUNT_OBJECT,
         recordTypeId:'$objectInfo.data.defaultRecordTypeId'})
      picklistHandler({data, error}){
        if(data){
            //picklistFieldValues is a parent for picklist fields of an object
            // All the picklist fields are avaialble in picklistFieldValues
            this.industryOptions = [...this.picklistValuesHandler(data.picklistFieldValues.Industry)]
            this.ratingOptions = [...this.picklistValuesHandler(data.picklistFieldValues.Rating)]
            this.typeOptions= [...this.picklistValuesHandler(data.picklistFieldValues.Type)]
            this.sourceOptions= [...this.picklistValuesHandler(data.picklistFieldValues.AccountSource)]
        }
        if(error){
            console.error(error)
        }
      }

    //Written the data in the form of map
    picklistValuesHandler(data){
      return data.values.map(item=>({label:item.label, value:item.value}))
    }

    handleChange(event){
        //Optimization
        //Object destructing
        const {name, value} = event.target
          // If Account Industry is available add the value to selectedIndustry property
          if(name === 'Account Industry'){
            this.selectedIndustry = value
          }
            // If Account Rating is available add the value to selectedRating property
          if(name === 'Account Rating'){
            this.selectedRating = value
          }
           // If Account Type is available add the value to selectedType property
           if(name === 'Account Type'){
            this.selectedType = value
          }
           // If Account Source is available add the value to selectedSource property
           if(name === 'Account Source'){
            this.selectedSource = value
          }


        /*
        if(event.target.name == 'Account Industry'){
            this.selectedIndustry = event.target.value
        }
        if(event.target.name == 'Account Rating'){
            this.selectedRating = event.target.value
        }
        */
    }
}