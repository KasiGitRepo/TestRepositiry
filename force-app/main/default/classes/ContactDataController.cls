/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 12-24-2023
 * @last modified by  : Kasi Jangiti
**/
public with sharing class ContactDataController {
    /**
	 * @description : Fetch the contact data based on AccountId
	 * @author Kasi Jangiti | 12-24-2023
	 * @param String accountId
	 * @return List<Contact>
	 **/
	@AuraEnabled(cacheable=true)
	public static List<Contact> fetchContactsForDataTable(String accountId) {
		return [SELECT Id, Name, Account.Name, AccountId, Phone, Email,
		          Title, LeadSource FROM Contact WHERE AccountId = :accountId and 
				  AccountId !=null];
	}
}