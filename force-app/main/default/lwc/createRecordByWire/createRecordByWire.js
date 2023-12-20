/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-22-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import CONTACT_OBJECT from '@salesforce/schema/Contact'
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
export default class CreateRecordByWire extends LightningElement {

    formFields = {}
    chagneHandler(event) {
        const { name, value } = event.target
        this.formFields[name] = value
    }

    handleClick() {
        const recordInput = { apiName:CONTACT_OBJECT.objectApiName, fields: this.formFields }
        console.log('record Input :' + recordInput)
        createRecord(recordInput).then(result => {
            this.showToast('Success!', `Contact is created with Id ${result.id}`)
            this.template.querySelector('form.formCreator').reset()
            formFields = {}
        }).catch(error => {
            this.showToast('Error!!!', error.body.message, 'error')
           console.error(error)
           alert('Some error occured'+JSON.stringify(error));
        })
    }

    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({
            title,
            message,
            variant: variant || 'success'
        }))
    }
}

