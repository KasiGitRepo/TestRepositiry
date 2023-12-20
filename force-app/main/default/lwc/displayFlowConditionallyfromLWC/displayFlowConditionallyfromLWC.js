/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 12-13-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement, wire, api } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import ACCOUNT_RATING from '@salesforce/schema/Account.Rating';
export default class DisplayFlowConditionallyfromLWC extends LightningElement {
    @api recordId;
    accountRating;

    //Fetch the data from the Record
    @wire(getRecord, {
        recordId: "$recordId",
        fields: ACCOUNT_RATING
    }) getRecordOutput({ data, error }) {
        if (data) {
            //Assign Account Rating value to property
            this.accountRating = getFieldValue(data, ACCOUNT_RATING);
        } else if (error) {
            console.log("Error Occured", JSON.stringify(error));
        }
    }

    //Pass the value to the Screen Flow variable
    get inputVariable() {
        return [
            { name: 'varRating', type: 'String', value: this.accountRating }
        ];
    }

    //If Rating is Hot
    get isAccountRatingHot() {
        return this.accountRating === "Hot" ? true : false;
    }

    //If Rating is Warm
    get isAccountRatingWarm() {
        return this.accountRating === "Warm" ? true : false;
    }

    //If Rating is Cold
    get isAccountRatingCold() {
        return this.accountRating === "Cold" ? true : false;
    }
}