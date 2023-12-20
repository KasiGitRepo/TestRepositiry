/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 10-08-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement } from 'lwc';

export default class Calculator extends LightningElement {
    numOne;
    numTwo;
    result;

    //General way to calculate 
    /*handleNumberOne(event) {
        this.numOne = event.target.value;
    }

    handleNumberTwo(event) {
        this.numTwo = event.target.value;
    }

    addHandler(event) {
        this.result = parseInt(this.numOne) + parseInt(this.numTwo);
    }
    subHandler(event) {
        this.result = parseInt(this.numOne) - parseInt(this.numTwo);
    }
    mulHandler(event) {
        this.result = parseInt(this.numOne) * parseInt(this.numTwo);
    }
    divHandler(event) {
        this.result = parseInt(this.numOne) / parseInt(this.numTwo);
    }
    clearHandler(event) {
        this.numOne = "";
        this.numTwo = ""
        this.result = ""
    }
    */

    //Best Practice with minimal code
    handleInput(event) {
        //Destructing, retrive/read the data from event.target object from html
        let { name, value } = event.target;
        if (name == 'number1') {
            this.numOne = value;
        } else if (name == 'number2') {
            this.numTwo = value;
        }
    }

    calculateHandler(event) {
        let buttonLabel = event.target.label;
        if (buttonLabel == 'Add') {
            this.result = parseInt(this.numOne) + parseInt(this.numTwo);
        } else if (buttonLabel == 'Sub') {
            this.result = parseInt(this.numOne) - parseInt(this.numTwo);
        } else if (buttonLabel == 'Mul') {
            this.result = parseInt(this.numOne) * parseInt(this.numTwo);
        } else if (buttonLabel == 'Div') {
            this.result = parseInt(this.numOne) / parseInt(this.numTwo);
        } else if (buttonLabel == 'Clear') {
            this.numOne = 0;
            this.numTwo = 0;
            this.result = '';
        }
    }
}