/**
 * @description       :
 * @author            : Kasi Jangiti
 * @group             :
 * @last modified on  : 08-25-2023
 * @last modified by  : Kasi Jangiti
 **/
public with sharing class MapControllerLWC {
	@AuraEnabled(cacheable=true)
	public static List<Account> getAccounts() {
		return [SELECT Id, Name, BillingCity, BillingState, BillingCountry, BillingPostalCode, BillingStreet, Description FROM Account ORDER BY Name];
	}
	
	@AuraEnabled(cacheable=true)
	public static List<Contact> getContacts() {
		return [SELECT Id, Name, Phone, Email, 
                 MailingStreet, MailingState, MailingCity, MailingCountry, 
                 MailingPostalCode FROM Contact ORDER BY Name ];
	}
}
