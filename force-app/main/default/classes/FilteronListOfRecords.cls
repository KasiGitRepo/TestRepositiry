/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-26-2023
 * @last modified by  : Kasi Jangiti
**/
public with sharing class FilteronListOfRecords {
	@AuraEnabled(cacheable=true)
	public static List<Contact> getContactList() {
		return [SELECT Id, Name, Account.Name, Email, Title FROM Contact];
	}
}

