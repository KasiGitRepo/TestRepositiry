/**
 * @description       :
 * @author            : Kasi Jangiti
 * @group             :
 * @last modified on  : 12-15-2023
 * @last modified by  : Kasi Jangiti
 **/
public with sharing class ContactController {
	
	/**
	 * @description
	 * @author Kasi Jangiti | 10-30-2023
	 * @return List<Contact>
	 **/
	@AuraEnabled(cacheable=true)
	public static List<Contact> getContactList() {
		List<Contact> conList = [SELECT Id, Name, FirstName, Title, LastName, Email, Phone, PhotoUrl FROM Contact WHERE PhotoUrl != null WITH USER_MODE LIMIT 20];
		return conList;
	}
	
	@AuraEnabled(cacheable=true)
	public static List<Lead> getLeadsList() {
		
		List<Lead> leadsList = [SELECT Id, Name, Phone, Email, AnnualRevenue, PhotoUrl FROM Lead WHERE PhotoUrl != null WITH USER_MODE LIMIT 20];
		return leadsList;
	}
	
	/**
	 * @description
	 * @author Kasi Jangiti | 10-30-2023
	 * @return List<Contact>
	 **/
	@AuraEnabled(cacheable=true)
	public static List<Contact> conList() {
		List<Contact> contacts = [SELECT Id, Name, Phone, Email, LeadSource, Title FROM Contact WITH USER_MODE LIMIT 20];
		
		if (!contacts.isEmpty()) {
			return contacts;
		}
		return null;
	}
	
	@AuraEnabled(cacheable=true)
	public static List<Contact> getContactListForDataTable() {
		return [SELECT Id, Name, Phone, Email, Title, Rank__c, Picture__c, AccountId, Account.Name FROM Contact WHERE AccountId != null WITH USER_MODE LIMIT 10];
	}
}
