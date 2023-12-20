/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-14-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement } from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/Opportunity'
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CustomValidationRecordEditForm extends LightningElement {

     objectName = ACCOUNT_OBJECT
     inputVal=''

     handleInput(event){
        this.inputVal = event.target.value
     }

     submitHandler(event){
        //To prevent loading the record detail page when click on button
        event.preventDefault();

        //Get the Input field value from template by querySelector
        const inputData = this.template.querySelector('lightning-input')

        //Assign input value to value property
        const value = inputData.value

        //Check weather value(input field value) includes 'America' text
        if(!value.includes('America')){

           // throw validation message if 'America' is not there in the value
           inputData.setCustomValidity("Name field must includes 'America'")
        }else{
            inputData.setCustomValidity("")

            //get all the fields from the event by detail property
            const fields = event.detail.fields

            //Assign value to Name field
            fields.Name = value

            //Add fields to the record-view-form
            this.template.querySelector('lightning-record-edit-form').submit(fields)
        }

        // report the validation on UI
        inputData.reportValidity()
        console.log('Submit Handler called')
     }

     //Toast message for success
     successHandler(event){
        const myevent = new ShowToastEvent({
             title:"Account is created",
             message:"Account Record is created",
             variant:"success"
        }) 
        this.dispatchEvent(myevent)    
      }

     //Toast message for error
     errorHandler(event){
        const toastError = new ShowToastEvent({
            title:"Error Occured",
            message:event.detail.message,
            variant:"error"
        })
          this.dispatchEvent(toastError)
     }
}