/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 10-08-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement } from 'lwc';

export default class ConditionalRendering extends LightningElement {

    isVisible = false
    name
    changeHandler() {
        this.isVisible = true
    }

    ChangeHandlerInput(event) {
        this.name = event.target.value
    }

    get ChangeInput() {
        return this.name === 'hello'
    }
}