/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 12-12-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement, api } from 'lwc';

export default class InvokeFlow extends LightningElement {
    @api recordId;

    get inputVariables() {
        return [
            { name: "varAccountId", type: "String", value: this.recordId },
            { name: 'varOperationType', type: 'String', value: 'Create Record' }
        ];
    }
}