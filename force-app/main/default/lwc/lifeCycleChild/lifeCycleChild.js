/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 10-05-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement, api } from 'lwc';

export default class LifeCycleChild extends LightningElement {

    count = 0 ;
    @api message = 'default';

    constructor() {
        super();
        console.log('Child Constructor Called')
        console.log('Count :' + this.count);
        console.log('Message :' + this.message);
        console.log('Button :' + this.template.querySelector('lightning-button'));
    }

    connectedCallback() {
        console.log('Child Connected Callback Called')
        console.log('Count :' + this.count);
        console.log('Message :' + this.message);     
        console.log('Button :' + this.template.querySelector('lightning-button'));
        let error = {
            code: 100,
            message: 'Error from child connected callback!'
        };
        throw error;
    }

    renderedCallback(){
        console.log('Child Render Callback Called'); 
        console.log(this.template.querySelector('lightning-button'));
    }

     disconnectedCallback(){
        console.log('Child Disconnected Callback called');
     }
    
     errorCallback(error, stack) {
        console.log('Child error callback called, error = ' + JSON.stringify(error) + ', stack = ' + JSON.stringify(stack));
    }

    handleCount(){
        this.dispatchEvent(new CustomEvent('increasecount',{
            detail :{
               message : 'Increased Count to ' + (++this.count)
            }   
        }));
    }
}