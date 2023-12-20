/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-12-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement } from 'lwc';

export default class SlotChild extends LightningElement {

    footerHandler(){
        //Fetch element from the markup by queryselector
        const footerElement = this.template.querySelector('.slds-card__footer')
        //If element is there
        if(footerElement){
            //Remove the hide the from the element
            footerElement.classList.remove('slds-hide')  
        }
    }
}