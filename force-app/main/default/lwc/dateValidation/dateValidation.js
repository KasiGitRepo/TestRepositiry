/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-26-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement } from 'lwc';

export default class DateValidation extends LightningElement {
    startDate
    endDate
    error
    success
    dateHandler(event) {
        const { name, value } = event.target
        this[name] = value
    }

    handleDate() {
        if (this.dateValidation(this.startDate, this.endDate)) {
            console.log("Data is Valid")
            this.success = "Data is Valid"
        } else {
            this.error = "Start Date should be less than the End Date"
        }
    }

    dateValidation(startDate, endDate) {
        return new Date(startDate).getTime() < new Date(endDate).getTime()
    }

}