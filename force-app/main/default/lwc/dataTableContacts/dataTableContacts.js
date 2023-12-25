/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 12-25-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement, wire } from 'lwc';
import getContactListForDataTable from '@salesforce/apex/ContactController.getContactListForDataTable';
const columns = [

    // Data type is badge
    {
        label: "Name", type: "contactNameType",
        typeAttributes: {
            contactName: {
                fieldName: "Name"
            }
        }
    },

    //Account Name
    {
        label: "Account Name", fieldName: "accountLink", type: "url", // Display Account Name
        typeAttributes: {
            label: {
                fieldName: "accountName", // To display Account Name instead AccountId
            },
            target: "_blank"
        }
    },

    { label: "Phone", fieldName: "Phone", type: "phone" },

    { label: "Email", fieldName: "Email", type: "email" },

    //Title with color
    {
        label: "Title", fieldName: "Title",
        cellAttributes: { // Add color to the text
            class: { fieldName: "titleColor" }
        }
    },

    //Rank with Icon(Data type as icon)
    {
        label: "Rank", fieldName: "Rank__c", type: "contactRankType",
        typeAttributes: {
            contactRank: {
                fieldName: "rankIcon"
            }
        }
    },

    //Data type as Image
    {
        label: "Picture", type: "contactImageType",
        typeAttributes: {
            contactPicture: {
                fieldName: "Picture__c"
            }
        },
        cellAttributes: {
            alignment: "center"
        }
    }
];

export default class DataTableContacts extends LightningElement {

    contacts = [];
    columns = columns;

    @wire(getContactListForDataTable)
    wiredContacts({ data, error }) {
        if (data) {
            this.contacts = data.map((record) => {
                let accountLink = "/" + record.AccountId; // Make the Account Name as Hyperlink
                let accountName = record.Account.Name; // Display Account Name in the Table
                let titleColor = "slds-text-color_success"; // Add color to the text
                let rankIcon = record.Rank__c > 5 ? "utility:ribbon" : "";
                return {
                    //Return the values from the map
                    ...record,
                    accountLink: accountLink,
                    accountName: accountName,
                    titleColor: titleColor,
                    rankIcon: rankIcon
                };
            });
        } else if (error) {
            console.log("Error in Data Table", error);
        }
    }
}