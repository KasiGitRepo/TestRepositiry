/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-05-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement, api } from 'lwc';

export default class P2cSliderComponent extends LightningElement {
    
    val =10

    changeHandler(event){
       this.val = event.target.value
    }

   @api resetSlider(){
        this.val= 0
    }
}