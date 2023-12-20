/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-17-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement } from 'lwc';
import ID from '@salesforce/user/Id'
import IS_GUEST from '@salesforce/user/isGuest'
export default class FetchUserId extends LightningElement {

     userId = ID
     isGuest = IS_GUEST
}