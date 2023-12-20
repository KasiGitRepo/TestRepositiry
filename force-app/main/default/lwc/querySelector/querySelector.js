import { LightningElement } from 'lwc';

export default class QuerySelector extends LightningElement {

    pClass = "text-CSS";
    showMessage = false;
    addHandler(event) {
        let element = this.template.querySelector('p');
        element.classList.add("dynamicCSS");
        console.log('Add button called');
    }
    removeHandler(event) {
        let element = this.template.querySelector('p');
        element.classList.remove("dynamicCSS");
    }
    toggleHandler(event) {
        let element = this.template.querySelector('p');
        element.classList.toggle("dynamicCSS")
    }
    handleCheckbox(event) {
        this.showMessage = !this.showMessage;
    }
}