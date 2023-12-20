/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-14-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement } from 'lwc';
import CONTACT_OBJECT from '@salesforce/schema/Contact'
import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName'
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName'
import PHONE_FIELD from '@salesforce/schema/Contact.Phone'
import EMAIL_FIELD from '@salesforce/schema/Contact.Email'
import ACCOUNTID_FIELD from '@salesforce/schema/Contact.AccountId'

export default class RecordEditFormContact extends LightningElement {

    objectName = CONTACT_OBJECT
    fields={
        firstNameField:FIRSTNAME_FIELD,
        lastNameField:LASTNAME_FIELD,
        PhoneField:PHONE_FIELD,
        emailField:EMAIL_FIELD,
        accountField:ACCOUNTID_FIELD
    }
}