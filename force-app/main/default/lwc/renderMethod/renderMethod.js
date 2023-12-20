/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 10-05-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement } from 'lwc';
import templateOne from './templateOne.html'
import templateTwo from './templateTwo.html'
import templateThree from './templateThree.html'
import defaultTemplate from './renderMethod.html'

export default class RenderMethod extends LightningElement {

     templateType

     handleClick(event){
        this.templateType = event.target.label
     }

    constructor(){
      super()
      alert('Constructor callback called')
    }

    connectedCallback(){
        alert('Connected callback called')
    }

    renderedCallback(){
        alert('Rendered callback called')
    }
       
    render(){
        alert('Render method called')
       return this.templateType === 'One' ? templateOne :
              this.templateType === 'Two' ? templateTwo :
              this.templateType === 'Three' ? templateThree :
              defaultTemplate
    }

}