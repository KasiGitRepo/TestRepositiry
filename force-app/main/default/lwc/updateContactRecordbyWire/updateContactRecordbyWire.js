/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-24-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement, wire } from 'lwc';
import CONTACT_OBJECT from '@salesforce/schema/Contact'
import { getListUi } from 'lightning/uiListApi';
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
const cols = [
    { label: 'Id', fieldName: 'Id' },
    { label: 'Name', fieldName: 'Name' },
    { label: 'Email', fieldName: 'Email', editable: 'true', "type": 'email' },
    { label: 'Phone', fieldName: 'Phone', editable: 'true' },
    { label: 'Title', fieldName: 'Title', editable: 'true' }
]
export default class UpdateContactRecordbyWire extends LightningElement {
    columns = cols
    draftValues = []
    contacts = []
    @wire(getListUi, {
        objectApiName: CONTACT_OBJECT,
        listViewApiName: 'AllContacts'
    })
    listviewHandler({ data, error }) {
        if (data) {
            // console.log(data)
            this.contacts = data.records.records.map(item => {
                return {
                    "Id": this.getContactValues(item, 'Id'),
                    "Name": this.getContactValues(item, 'Name'),
                    "Email": this.getContactValues(item, 'Email'),
                    "Phone": this.getContactValues(item, 'Phone'),
                    "Title": this.getContactValues(item, 'Title')
                }
            })
        }
        if (error) {
            console.error(error)
        }
    }

    getContactValues(data, field) {
        return data.fields[field].value
    }

    handleSave(event) {
        console.log(JSON.stringify(event.detail.draftValues))
        const recordInputs = event.detail.draftValues.map(draft => {
            const fields = { ...draft }
            return { fields: fields }
        })
        const promises = recordInputs.map(recordInput => updateRecord(recordInput))
        Promise.all(promises).then(() => {
            console.log('Contact Record updated successfully')
            alert('Updated all the contact records successfully')
            this.showToast('Success!!', 'Record Updated')
            this.draftValues=[]
        }).catch(error => {
            this.showToast('Error!!', error.body.message, 'error')
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