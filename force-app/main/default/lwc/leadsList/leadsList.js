/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 10-19-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement, wire } from 'lwc';
import leadsList from '@salesforce/apex/ContactController.getLeadsList';
export default class LeadsList extends LightningElement {

    selectedRecord;

    @wire(leadsList) leads;

    selectionHandler(event) {
        let selectedId = event.detail;

        this.selectedRecord = this.leads.data.find(
            (currentItem) => currentItem.Id === selectedId);
    }
}