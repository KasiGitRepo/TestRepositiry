/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 10-05-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement , track} from 'lwc';

export default class Parent extends LightningElement {
   /* 
    message = 'update the new decrement value'
    showChild = true;
    myData;
    btnLabel;
    constructor(){
        super()
        this.myData = 'I am Kasi';
        console.log('Parent Constructor called')
        console.log(this.template.querySelector('c-child'))
    }

    connectedCallback(){
        this.btnLabel = 'Click me'
        alert(this.btnLabel);
        this.myData = 'Kasi from Andhra Pradesh'
        console.log('Parent Connected callback called')
        console.log(this.template.querySelector('c-child'))  
    }

    renderedCallback(){
        this.btnLabel = 'Label changed in Rendered Callback'
        alert(this.btnLabel)
        console.log('Parent Render callback called')
        console.log(this.template.querySelector('c-child'))
    }

    updateValue(event){
      this.message = event.detail.message
    }

    handleToggle(){
      this.showChild = !this.showChild
    }
    */
 /*
    @track greeting = 'Hello Good morning'
    @track hasRendered=true;   
       
        renderedCallback(){
        if(this.hasRendered){
            console.log('Render CallBack Called')
            this.greeting = 'Overriden by rendered callback'
            this.hasRendered=false;
        }
    }

    handleGreeting(){
        this.greeting = 'Hello Good Evening'
        console.log(this.greeting)
    }
    */

    @track  btnLabel = 'Hello'
    @track hasRendered=true;   
       
        renderedCallback(){
        if(this.hasRendered){
            console.log('Render CallBack Called')
            this.btnLabel = 'Overriden by rendered callback'
            this.hasRendered=false;
        }
    }

    handleGreeting(){
        this.btnLabel = 'Hello Good Evening'
        console.log(this.btnLabel)
    } 
}