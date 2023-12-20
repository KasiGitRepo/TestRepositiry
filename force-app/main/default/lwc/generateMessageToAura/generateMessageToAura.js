/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 12-14-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement } from 'lwc';

export default class GenerateMessageToAura extends LightningElement {
    firstName = "";
    lastName = "";
    changeHandler(event) {
        //Destructure the input
        let { name, value } = event.target;
        if (name === 'fname') {
            this.firstName = value;
        } else if (name === 'lname') {
            this.lastName = value;
        }
    }
    clickHandler() {
        //Generate a FullName with help of String Interpolation
        let fullName = `${this.firstName} ${this.lastName}`.toUpperCase();

        let mycustomEvent = new CustomEvent("name", {
            detail: {
                fullName: fullName
            }
        });
        this.dispatchEvent(mycustomEvent);
    }
}