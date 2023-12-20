/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 11-07-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement } from 'lwc';

export default class ChildComponentComposition extends LightningElement {

    // Event Handler to handle custom event with in the shadow boundary
    grandChildHandler() {
        console.log('Child Event Handler at Grand-Child level with in the component');
    }

    // Event Handler to handle custom event with in child component but outside the shadow boundary
    grandChildHandleratDiv() {
        console.log('Child Event Handler at Grand-Child level with in the component at Div tag');
    }
}