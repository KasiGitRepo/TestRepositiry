/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 11-07-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement } from 'lwc';

export default class GrandParentComposition extends LightningElement {
    //Event Handler with in the component with in the shadow boundary
    childEventHandleratGrandParent() {
        console.log('Grand Parent Event Handler at child level with in the component');
    }

    //Event Handler with in the component outside the shadow boundary
    childEventHandleratGrandParentDiv() {
        console.log('Grand Parent Event Handler at paernt level of Grnadparent component with in Div tag');
    }
}