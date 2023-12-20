/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 12-13-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement, api } from 'lwc';

export default class ChildLWCcomponent extends LightningElement {
    //Public property to get the data from Aura Component(Parent)
    @api message;

    //Public method to get data from Aura Component
    @api getDataFromAura(greeting) {
        alert(greeting.toUpperCase());
    }
}