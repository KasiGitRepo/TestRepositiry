/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 12-13-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement, api } from 'lwc';

export default class ExchangeDatawithFlow extends LightningElement {
    @api recordId;

    accountId;
    opType;
    opDate;

    //Passing input to Screen Flow variables
    get flowInputVariables() {
        return [
            { name: 'varAccountId', type: 'String', value: this.recordId },
            { name: 'varOPerationType', type: 'String', value: 'Create Record' },
            { name: 'varOperationDate', type: 'Date', value: '2023-12-12' }
        ];

    }

    //Send output from flow to LWC
    statusChangeHandler(event) {
        //Check the status of the flow
        if (event.detail.status === 'FINISHED') {
            let outputValues = event.detail.outputVariables;

            //Iterate the output variables
            for (let i = 0; i < outputValues.length; i++) {
                let outputItem = outputValues[i];
                if (outputItem.name == 'varAccountIdOutput') {
                    this.accountId = outputItem.value;
                    console.log('Output AcountId', outputItem.value);
                }
                if (outputItem.name == 'varOperationDateOutput') {
                    this.opDate = outputItem.value;
                    console.log('Output Operation date', outputItem.value);
                }
                if (outputItem.name == 'varOperationOutputType') {
                    this.opType = outputItem.value;
                    console.log('Output Operation type', outputItem.value);
                }
            }
        }
    }
}