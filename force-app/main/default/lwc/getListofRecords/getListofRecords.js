/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-22-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement, wire } from 'lwc';
import { getListUi } from 'lightning/uiListApi';
import CONTACT_OBJECT from '@salesforce/schema/Contact'
export default class GetListofRecords extends LightningElement {
    contacts = []
    // Pagination
    pageToken = null  // Initially it was null, when wire service provisions display new value by reactive
    nextPageToken = null // Initially it is null
    previousPageToken = null // Initially it is null
    @wire(getListUi, {
        objectApiName: CONTACT_OBJECT,
        listViewApiName: 'AllContacts',
        pageSize: 5,
        sortBy: 'Title',
        pageToken: '$pageToken' // Make it as reactive
    })
    contactsListHandler({ data }) {
        if (data) {
          //  console.log(data)
            this.contacts = data.records.records
            //Next token
            this.nextPageToken = data.records.nextPageToken
            //Previous token
            this.previousPageToken = data.records.previousPageToken
        }
    }

    //Handle previous
    handlePreviousPage() {
        //Assign previous value to page token
        this.pageToken = this.previousPageToken
    }

    //Handle Next
    handleNextPage() {
      //Assign next value to page token
        this.pageToken = this.nextPageToken
    }
}