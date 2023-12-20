/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 10-20-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement } from 'lwc';

export default class ParentComp extends LightningElement {
    displayMessage;
    empDetails = [
        {
            id: 1,
            name: "Kasi Jangiti",
            city: "Guntur",
            technology: "Salesforce",
            designation: "Developer",
            company: "Dentsu"
        },
        {
            id: 2,
            name: "Nanda Kishore",
            city: "Hyderabad",
            technology: "AWS Devops",
            designation: "Developer",
            company: "Birlasoft"
        },
        {
            id: 3,
            name: "Zahher Khan",
            city: "Ongole",
            technology: "Banking",
            designation: "Support Engineer",
            company: "Techno"
        },
        {
            id: 4,
            name: "Pavani Lakka",
            city: "Mumbai",
            technology: "Salesforce",
            designation: "Sr.Developer",
            company: "Deloitee"
        }
    ];

    displayHandler(event) {
        this.displayMessage = 'Passing data from Parent Component to the child component by Public properties';
        console.log("this.message", this.message);
    }
}