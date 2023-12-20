/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-22-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
import OPPORTUNITY_OBJECT from '@salesforce/schema/Opportunity'
export default class CreateRecordOnOpportunity extends LightningElement {

    formFields = {}

    chagneHandler(event) {
        const { name, value } = event.target
        this.formFields[name] = value
    }

    handleClick() {
        const recordInput = { apiName: OPPORTUNITY_OBJECT.objectApiName, fields: this.formFields }
        createRecord(recordInput).then(result => {
            this.showToast('Success!!', `Opportunity is created with Id: ${result.id}`, 'success')
            this.template.querySelector('form.formCreator').reset()
            this.formFields = {}
        }).catch(error => {
            this.showToast('Error', error.body.message)
            alert(JSON.stringify(error))
        })
    }

    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({
            title,
            message,
            variant: variant || 'error'
        }))
    }
}