/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 12-14-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement } from 'lwc';
//Import the below modules for the alert,confirm and prompt
import LightningAlert from 'lightning/alert';
import LightningConfirm from 'lightning/confirm';
import LightningPrompt from 'lightning/prompt';
export default class AlertConfirmPromptMethodsinLWC extends LightningElement {

    //Asynchronous Method
    async alertHandler() {
        await LightningAlert.open({
            message: 'this is the alert message',
            theme: 'error', // a red theme intended for error states
            label: 'Error!', // this is the header text
        });
    }

    //Asynchronous Method
    async confirmHandler() {
        const result = await LightningConfirm.open({
            message: 'Are you Sure to Proceed',
            variant: 'header',
            label: 'this is the confirmation message',
            theme: 'success'
            // setting theme would have no effect      
        });
        //Confirm has been closed
        //result is true if OK was clicked
        //and false if cancel was clicked
        console.log(result);
    }


    promptHandler() {
        LightningPrompt.open({
            message: 'Who is your favorate crickter',
            //theme defaults to "default"
            label: 'Please Respond', // this is the header text
            defaultValue: 'Verendar Sehwag', //this is optional
            theme: 'shade'
        }).then((result) => {
            //Prompt has been closed
            //result is input text if OK clicked
            //and null if cancel was clicked
            console.log(result);
        });
    }
}