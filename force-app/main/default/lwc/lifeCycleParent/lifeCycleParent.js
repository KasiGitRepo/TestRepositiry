/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 10-05-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement } from 'lwc';

export default class LifeCycleParent extends LightningElement {
   /*
  //  isChildVisible = false
    constructor() {
        super()
        console.log('Parent Constructor Callback')
    }

    connectedCallback() {
        console.log('Parent Connected Callback')
    }
    renderedCallback(){   
        console.log('Parent Render Callback')     
    }

    changeHandler(){
       this.isChildVisible= !this.isChildVisible
    }

   errorCallback(error, stack){
      console.log(error.message)
      console.log(stack)
   }
   */
   
   message = 'updated count will appear here';
   showChild=true;
   constructor(){
    super();
    console.log('Parent Constructor Called');
   }

   connectedCallback(){
    console.log('Parent Connected Callback Called');
    console.log(this.template.querySelector('c-life-cycle-child'));
   }

   renderedCallback(){
    console.log('Parent Rendered Callback Called');
    console.log(this.template.querySelector('c-life-cycle-child'));
   }

   errorCallback(error, stack) {
    console.log('Parent error callback called, error = ' + JSON.stringify(error) + ', stack = ' + stack);
    console.log(this.template.querySelector('c-life-cycle-child'));
}

   updateMessage(event){
      this.message = event.detail.message;
   }

   toggleChild(){
     this.showChild = !this.showChild ;
   }
}