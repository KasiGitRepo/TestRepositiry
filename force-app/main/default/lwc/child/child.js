/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 10-05-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement , api} from 'lwc';

export default class Child extends LightningElement {

   count = 100
   name = 'Kasi Jangiti'
   @api message = 'Child Component'  

   constructor(){
      super()
      console.log('Child Constructor called')
      console.log('Count :' + this.count)
      console.log('Name :' + this.name)
      console.log('Message : ' + this.message)
      console.log(this.template.querySelector('lightning-button'))
   }

   connectedCallback(){
     console.log('Child Connectd callback called')
     console.log('Count :' + this.count)
     console.log('Name :' + this.name)
     console.log('Message : ' + this.message)
     console.log(this.template.querySelector('lightning-button'))
   }

   renderedCallback(){
     console.log('Child Render callback called')
     console.log('Count :' + this.count)
     console.log('Name :' + this.name)
     console.log('Message : ' + this.message)
     console.log(this.template.querySelector('lightning-button'))
   }

   disconnectedCallback(){
     console.log('Child Disconnected callback called')
     console.log(this.template.querySelector('lightning-button'))
   }

   handleDecrement(){
     this.dispatchEvent(new CustomEvent('decrement', {
        detail : {
            message : 'Decrement value to '  + (--this.count)
        }
     }));
   }
}