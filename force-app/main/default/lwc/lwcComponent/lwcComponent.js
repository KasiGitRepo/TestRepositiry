/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-14-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement , api} from 'lwc';

export default class LwcComponent extends LightningElement {

    @api message

    handleDisplay(){
        const customEvent = new CustomEvent('senddata', {
             detail:{
                "msg":"Data is passing from Lightning Web Component"
             }
        })

        this.dispatchEvent(customEvent)
    }
}