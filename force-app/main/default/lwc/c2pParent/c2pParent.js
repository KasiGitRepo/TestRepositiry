/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-11-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement } from 'lwc';

export default class C2pParent extends LightningElement {
  
    showModal = false
     message
     event
     component
    handleClick(event){
        this.showModal = true
    }
    closeHandler(event){
        this.message = event.detail.message
        this.event = event.detail.event
        this.component = event.detail.component
        this.showModal = false
    }

    parentDivHandler(){
        console.log('Parent div handler called')
    }
}