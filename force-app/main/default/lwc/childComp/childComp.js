/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 10-20-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement, api } from 'lwc';

export default class ChildComp extends LightningElement {

    @api employee;

    @api message;

}