/**
 * @description       :
 * @author            : Kasi Jangiti
 * @group             :
 * @last modified on  : 10-31-2023
 * @last modified by  : Kasi Jangiti
 **/
public with sharing class AccTriggerHandler {
	
	/**
	* @description 
	* @author Kasi Jangiti | 10-31-2023 
	* @param List<Account> accounts 
	* @param Map<Id Account> oldMap 
	**/
	public static void updateChildRecords(List<Account> accounts, Map<Id,Account> oldMap) {
		Map<Id, Account> accMap = new Map<Id, Account>();
		if (!accounts.isEmpty()) {
			for (Account acc : accounts) {
				if ( oldMap.get(acc.Id).Status__c != acc.Status__c && acc.Status__c == 'Inactive') {
					accMap.put(acc.Id, acc);
				}
			}
		}
		
		List<Contact> contactToUpdate = new List<Contact>();
		List<Opportunity> opportunitiesToDelete = new List<Opportunity>();
		if (!accMap.isEmpty()) {
			
			List<Contact> contactList = [SELECT Id, AccountId, Donot_Contact__c FROM Contact 
                                            WHERE AccountId IN :accMap.keySet()];
			
			if (!contactList.isEmpty()) {
				for (Contact con : contactList) {
					if (accMap.containsKey(con.AccountId)) {
						con.Donot_Contact__c = true;
						contactToUpdate.add(con);
					}
				}
			}
			
			List<Opportunity> opportunityList = [SELECT Id, AccountId, StageName FROM Opportunity 
                                                   WHERE AccountId IN :accMap.keySet()];
			if (!opportunityList.isEmpty()) {
				for (Opportunity opp : opportunityList) {
					if (opp.StageName != 'Closed Won') {
						if (accMap.containsKey(opp.AccountId)) {
							opportunitiesToDelete.add(opp);
						}
					}
				}
			}
		}
		
		if (opportunitiesToDelete.size() > 0) {
			try {
				delete opportunitiesToDelete;
			} catch (Exception e) {
				System.debug('Error while deleting opportunities :' + e.getMessage());
			}
		}
		
		if (contactToUpdate.size() > 0) {
			try {
				update contactToUpdate;
			} catch (Exception e) {
				System.debug('Error while updating Contact checkbox :' + e.getMessage());
			}
		}
	}
}