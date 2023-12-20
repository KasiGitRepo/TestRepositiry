/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-11-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement } from 'lwc';

export default class C2pModalComponent extends LightningElement {
    
    closeHandler(){
        const myEvent = new CustomEvent('close', {
            bubbles:true,
            detail:{
                message:"Message has been passed successfully!!!",
                event:"Event has been fired",
                component:"Parent Component function has been called"
            }
        })
        this.dispatchEvent(myEvent)
    }

    footerHandler(){
        console.log('Footer Handler called by Event Bubbling')
    }

    divHandler(){
        console.log('Div Handler called by Event Bubbling')
    }
}