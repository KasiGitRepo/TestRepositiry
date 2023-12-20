/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 10-14-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement, wire, api } from 'lwc';
import getResults from '@salesforce/apex/sObjectDataHandler.getResults'
const DELAY = 300;

export default class CustomLookupFilter extends LightningElement {

    @api apiName = "Account";
    searchInput = '';
    @api objectLabel = "Account";
    @api iconName = "standard:account";
    delayTimeout;
    selectedRecord = {
        selectedId: '',
        selectedName: ''
    };
    displayOptions = false;

    @wire(getResults, {
        objectName: "$apiName",
        searchKey: "$searchInput"
    }) customLookupData;



    searchHandler(event) {
        /*
        Debouncing :
          We don not update the reactive property immediately as long as the function 
           is being called within the delay.We setTimeout()
         */
        //Clear the time once it is executed
        window.clearTimeout(this.delayTimeout);

        //Store the entered value in a variable
        let enterText = event.target.value;

        this.delayTimeout = setTimeout(() => {
            this.searchInput = enterText;
            this.displayOptions = true;
        }, DELAY);
    }

    get isRecordSelected() {
        return this.selectedRecord.selectedId === "" ? false : true;
    }

    changeHandler(event) {
        let selectedId = event.currentTarget.dataset.item;
        // console.log("selectedId", selectedId);
        //Find the current record Id
        let outputRecord = this.customLookupData.data.find((currentItem) => currentItem.Id === selectedId);
        // console.log("outputRecord", outputRecord);
        this.selectedRecord = {
            selectedId: outputRecord.Id,
            selectedName: outputRecord.Name
        };
        // console.log("Selected Object", JSON.stringify(this.selectedRecord));
        this.displayOptions = false;
        //console.log("displayOptions", this.displayOptions);
    }

    removeSelectionHandler(event) {
        this.selectedRecord = {
            selectedId: '',
            selectedName: ''
        };
        this.displayOptions = false;
    }

}