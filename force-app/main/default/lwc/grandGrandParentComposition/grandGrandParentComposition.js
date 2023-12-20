/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 11-07-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement } from 'lwc';

export default class GrandGrandParentComposition extends LightningElement {

    //Event handler at component level but ourside the shadow boundary
    childEventHandleratGrandGrandParentDiv() {
        console.log('Grand-Grand Parent Event Handler at Parent level with in the component at Div');
    }

    //Event handler at component level within the shadow boundary
    childEventHandleratGrandGrandParent() {
        console.log('Grand-Grand Parent Event Handler at child level with in the component');
    }
}