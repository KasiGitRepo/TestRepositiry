/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 10-08-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement } from 'lwc';

export default class ApiDecoratorParent extends LightningElement {

    //Initialize the properties to pass it to the public peroperty
    greeting = 'Welcome to LWC Series of classes';
    userInfo = {
        certificate: "Salesforce Certified Platfrom Developer-1"
    }
}