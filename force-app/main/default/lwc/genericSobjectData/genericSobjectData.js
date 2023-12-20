/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 10-14-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement, wire, api } from 'lwc';
import fetchsObjectRecords from '@salesforce/apex/genericCustomLookupFilter.fetchsObjectRecords';
const DELAY = 300;
export default class GenericSobjectData extends LightningElement {

    @api apiName = "";
    searchInput = "";
    @api objectLabel = "";
    displayRecords = false;
    delayTimeout;
    @api iconName = '';
    selectedRecord = {
        selectedId: "",
        selectedName: ""
    };

    @wire(fetchsObjectRecords, {
        objectApiName: "$apiName",
        searchKey: "$searchInput"
    }) customRecordsDataHandler;

    get isRecordSelected() {
        return this.selectedRecord.selectedId === "" ? false : true;
    }

    searchHandler(event) {
        window.clearTimeout(this.delayTimeout);
        let enteredText = event.target.value;
        this.delayTimeout = setTimeout(() => {
            this.searchInput = enteredText;
            this.displayRecords = true;
        }, DELAY);
        // this.displayRecords = false;
    }

    clickHandler(event) {
        let selectedRow = event.currentTarget.dataset.item;
        console.log("selectedRow", selectedRow);
        let outputRecord = this.customRecordsDataHandler.data.find((currentItem) => currentItem.Id === selectedRow);
        this.selectedRecord = {
            selectedId: outputRecord.Id,
            selectedName: outputRecord.Name
        };
        console.log("Selected Object", JSON.stringify(this.selectedRecord));
        this.displayRecords = false;
    }

    removaldataHandler(event) {
        this.selectedRecord = {
            selectedId: "",
            selectedName: ""
        };
        this.displayRecords = false;
    }
}