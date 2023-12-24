/**
 * @description       :
 * @author            : Kasi Jangiti
 * @group             :
 * @last modified on  : 12-20-2023
 * @last modified by  : Kasi Jangiti
 **/
public with sharing class ApexTriggerforMultiPicklistHandler {
	
	public static void handleAfterInsertEvents(List<Account> accList, Map<Id, Account> oldMap) {
		
        List<String> listOfStrings = new List<String>();
		Map<Id, List<String>> mapofCountries = new Map<Id, List<String>>();
		if (!accList.isEmpty()) {
			for (Account acc : accList) {
				if (oldMap == null) {
					if (acc.Destination__c != null) {
						//listOfStrings = new List<String>();
						System.debug('Insert operation');
						listOfStrings = acc.Destination__c.split(';');
						mapofCountries.put(acc.Id, listOfStrings);
					}
				}
				if (oldMap != null) {
					listOfStrings = new List<String>();
					if (acc.Destination__c != oldMap.get(acc.Id).Destination__c && acc.Destination__c != null) {
						System.debug('Update operation');
						listOfStrings = acc.Destination__c.split(';');
						mapofCountries.put(acc.Id, listOfStrings);
					}
				}
			}
			System.debug('List of Values :' + listOfStrings);
			List<Contact> listToInsert = new List<Contact>();
			if (!mapofCountries.isEmpty()) {
				for (Id accId : mapofCountries.keySet()) {
					for (String str : mapofCountries.get(accId)) {
						// Create Contact instance
						Contact con = new Contact();
						con.LastName = str;
						con.FirstName = 'Destination';
						con.AccountId = accId;
						con.Phone = '7986465';
						listToInsert.add(con);
					}
				}
			}
			if (listToInsert.size()>0) {
				try {
					insert listToInsert;
				} Catch (Exception e) {
					System.debug('Error Message :' + e.getMessage());
				}
			}
		}
	}
}