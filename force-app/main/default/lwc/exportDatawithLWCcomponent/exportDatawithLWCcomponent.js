/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 11-27-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement, wire } from 'lwc';
import getAccountRecords from '@salesforce/apex/CSVcontroller.getAccountRecords';

export default class ExportDatawithLWCcomponent extends LightningElement {

    columns = [
        { label: 'Account Name', fieldName: 'Name', editable: true },
        { label: 'Annual Revenue', fieldName: 'AnnualRevenue', type: 'currency', editable: true },
        { label: 'Phone', fieldName: 'Phone', type: 'phone', editable: true },
        { label: 'Industry', fieldName: 'Industry', type: 'text', editable: true },
        { label: 'Rating', fieldName: 'Rating', type: 'text', editable: true },
        { label: 'Type', fieldName: 'Type', type: 'text', editable: true }
    ];

    accounts = [];

    @wire(getAccountRecords)
    accountList({ data, error }) {
        if (data) {
            this.accounts = data;
            console.log("Data from Data Table", this.accounts);
        } else {
            console.log(error);
        }
    }

    get checkRecord() {
        return this.accounts.length > 0 ? false : true;
    }

    exportHandler(event) {
        let selectedRows = [];
        let downloadRows = [];
        selectedRows = this.template.querySelector("lightning-datatable").getSelectedRows();
        if (selectedRows.length > 0) {
            downloadRows = [...selectedRows];
        } else {
            downloadRows = [...this.accounts];
        }
        let csvFile = this.convertArrayToCSV(downloadRows);
        this.createLinkDownload(csvFile);
    }

    //Convert Array into CSV format
    convertArrayToCSV(downloadRows) {

        /*
           //Get the keys from Object nithing but fields in array format
             Object.keys(downloadRows[0]) 
        */
        //Field Names
        let csvHeader = Object.keys(downloadRows[0]).toString();
        //Fields Data
        let csvBody = downloadRows.map(currentItem => Object.values(currentItem).toString());
        //Add the Header and Body in a single entity
        // "\n" => comes in a new line
        //join method is used to join all the rows
        let csvFile = csvHeader + "\n" + csvBody.join("\n");
        return csvFile;
    }

    createLinkDownload(csvFile) {

        //Create an anchor tag
        const downloadLink = document.createElement("a");

        //Create a url
        downloadLink.href = "data:text/csv;charset=utf-8," + encodeURI(csvFile);

        //Create a Target
        downloadLink.target = "_blank";

        //Name of the downloaded file
        downloadLink.download = "Account_Data.csv";

        //Download function
        downloadLink.click();

    }
    /*
       columns = [
           { label: 'Account Name', fieldName: 'Name', editable: true },
           { label: 'Annual Revenue', fieldName: 'AnnualRevenue', type: 'currency', editable: true },
           { label: 'Phone', fieldName: 'Phone', type: 'phone', editable: true },
           { label: 'Industry', fieldName: 'Industry', type: 'text', editable: true },
           { label: 'Rating', fieldName: 'Rating', type: 'text', editable: true },
           { label: 'Type', fieldName: 'Type', type: 'text', editable: true }
       ];
   
       accounts = [];
   
       @wire(getAccountRecords)
       accountList({ data, error }) {
           if (data) {
               this.accounts = data;
           } else {
               console.log(error);
           }
       }
   
       get checkRecord() {
           return this.accounts.length > 0 ? false : true;
       }
   
       exportHandler(event) {
   
           let selectedRows = [];
           let downloadRecords = [];
           selectedRows = this.template.querySelector("lightning-datatable").getSelectedRows();
           if (selectedRows.length > 0) {
               downloadRecords = [...selectedRows];
           } else {
               downloadRecords = [...this.accounts];
           }
           let csvFile = this.convertArrayToCSVFormat(downloadRecords);
           this.downloadLink(csvFile);
       }
   
       convertArrayToCSVFormat(downloadRecords) {
           let csvHeader = Object.keys(downloadRecords[0]).toString();
           let csvBody = downloadRecords.map(currentItem => Object.values(currentItem).toString());
           let csvFile = csvHeader + "\n" + csvBody.join("\n");
           return csvFile;
       }
   
       downloadLink(csvFile) {
           let downLink = document.createElement("a");
           downLink.href = "data:text/csv;charset=utf-8," + encodeURI(csvFile);
           downLink.target = "_blank";
           downLink.download = "Account_Data.csv";
           downLink.click();
       }
       */
}