/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-16-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement, wire } from 'lwc';
// Import the below module from lightning navigation
import { CurrentPageReference } from 'lightning/navigation'
export default class FetchCurrentReference extends LightningElement {

    //This can fetch all the CurrentPageReference from lightning navigation
    @wire(CurrentPageReference)

    //It is an object store all the values
    pageRef

    //getter to update the page if there is any change on UI
    get pageReference() {
        //If there is a value in the pageRef object, convert it into string format
        return this.pageRef ? JSON.stringify(this.pageRef, null, 2) : ''
    }
}   