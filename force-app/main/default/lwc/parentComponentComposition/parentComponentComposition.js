/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 11-07-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement } from 'lwc';

export default class ParentComponentComposition extends LightningElement {

    // Event Handler with in the shadow boundary
    childEventHandler() {
        console.log('Parent Event Handler at child level with in the component');
    }

    // Event Handler without shadow boundary at level-1
    childDivEventHandler() {
        console.log('Parent Event Handler at Parent level in first Div tag');
    }

    // Event Handler without shadow boundary at level-2
    childDivEventHandlerDiv() {
        console.log('Parent Event Handler at Parent level in the second Div tag with in the parent component');
    }
}