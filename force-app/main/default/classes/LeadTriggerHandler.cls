/**
 * @description       :
 * @author            : Kasi Jangiti
 * @group             :
 * @last modified on  : 10-31-2023
 * @last modified by  : Kasi Jangiti
 **/
public with sharing class LeadTriggerHandler {
	
	/**
	 * @description
	 * @author Kasi Jangiti | 10-31-2023
	 * @param List<Lead> leadsList
	 **/
	public static void updateConvertedLeads(List<Lead> leadsList) {
		Set<Id> convertedAccountIds = new Set<Id>();
		Set<Id> convertedContactIds = new Set<Id>();
		Set<Id> convertedOpportunityIds = new Set<Id>();
		List<Lead> convertedLeadsList = new List<Lead>();
		Map<Id, Account> accMap = new Map<Id, Account>();
		Map<Id, Contact> conMap = new Map<Id, Contact>();
		Map<Id, Opportunity> oppMap = new Map<Id, Opportunity>();
		List<Task> taskListToInsert = new List<Task>();
		if (!leadsList.isEmpty()) {
			for (Lead leadRec : leadsList) {
				if (leadRec.IsConverted == true) {
					convertedLeadsList.add(leadRec);
					convertedAccountIds.add(leadRec.ConvertedAccountId);
					convertedContactIds.add(leadRec.ConvertedContactId);
					convertedOpportunityIds.add(leadRec.ConvertedOpportunityId);
				}
			}
		}
		
		if (!convertedAccountIds.isEmpty()) {
			accMap = new Map<Id, Account>([SELECT Id, Name FROM Account WHERE Id IN :convertedAccountIds]);
		}
		
		if (!convertedContactIds.isEmpty()) {
			conMap = new Map<Id, Contact>([SELECT Name, Email FROM Contact WHERE Id IN :convertedContactIds]);
		}
		
		if (!convertedOpportunityIds.isEmpty()) {
			oppMap = new Map<Id, Opportunity>([SELECT Name, StageName, CloseDate, Amount FROM Opportunity WHERE Id IN :convertedOpportunityIds]);
		}
		
		if (!convertedLeadsList.isEmpty()) {
			for (Lead eachLead : convertedLeadsList) {
				Task newTask = new Task();
				newTask.Subject = 'Follow-up on Lead Conversion';
				newTask.Status = 'Not Started';
				newTask.ActivityDate = Date.today() + 2;
				newTask.Priority = 'Medium';
				newTask.WhoId = eachLead.ConvertedContactId;
				newTask.WhatId = eachLead.ConvertedOpportunityId;
				newTask.OwnerId = UserInfo.getUserId();
				
				String taskdescription = 'Lead Name :' + eachLead.LastName + '\n';
				taskdescription += 'Lead Email :' + eachLead.Email + '\n';
				taskdescription += 'Annual Revenue : ' + eachLead.AnnualRevenue + '\n';
				
				if (accMap.containsKey(eachLead.ConvertedAccountId)) {
					Account acc = accMap.get(eachLead.ConvertedAccountId);
					taskdescription += 'Account Name :' + acc.Name + '\n';
				}
				
				if (conMap.containsKey(eachLead.ConvertedContactId)) {
					Contact con = conMap.get(eachLead.ConvertedContactId);
					taskdescription += 'Contact Name :' + con.Name + '\n';
					taskdescription += 'Contact Email :' + con.Email + '\n';
				}
				
				if (oppMap.containsKey(eachLead.ConvertedOpportunityId)) {
					Opportunity opp = oppMap.get(eachLead.ConvertedOpportunityId);
					taskdescription += 'Opportunity Name :' + opp.Name + '\n';
					taskdescription += 'Opportunity Stage :' + opp.StageName + '\n';
					taskdescription += 'Opportunity CloseDate :' + opp.CloseDate + '\n';
				}
				
				newTask.Description = taskdescription;
				taskListToInsert.add(newTask);
			}
		}
		
		if (taskListToInsert.size() > 0) {
			try {
				insert taskListToInsert;
			} catch (Exception e) {
				System.debug('Error occur while creating task record :' + e.getMessage());
			}
		}
	}
	
	public static void handleConvertedRecords(List<Lead> leadRecords) {
		/*
		 * Set<Id> accIds = new Set<Id>();
		 * Set<Id> conIds = new Set<Id>();
		 * Set<Id> oppIds = new Set<Id>();
		 * Map<Id, Lead> leadMap = new Map<Id, Lead>();
		 *
		 * if (!leadRecords.isEmpty()) {
		 * for (Lead leadRec : leadRecords) {
		 * if (leadRec.IsConverted == true) {
		 * accIds.add(leadRec.ConvertedAccountId);
		 * conIds.add(leadRec.ConvertedContactId);
		 * oppIds.add(leadRec.ConvertedOpportunityId);
		 * leadMap.put(leadRec.ConvertedOpportunityId, leadRec);
		 * }
		 * }
		 * }
		 *
		 * List<Account> accListToUpdate = new List<Account>();
		 * List<Contact> conListToUpdate = new List<Contact>();
		 * List<Opportunity> oppListToUpdate = new List<Opportunity>();
		 *
		 * if (!accIds.isEmpty()) {
		 * List<Account> accounts = [SELECT Id, Active__c FROM Account
		 * WHERE Id IN :accIds];
		 * if (!accounts.isEmpty()) {
		 * for (Account acc : accounts) {
		 * acc.Active__c = 'Yes';
		 * accListToUpdate.add(acc);
		 * }
		 * }
		 * }
		 * if (!conIds.isEmpty()) {
		 * List<Contact> contacts = [SELECT Id, Lead_Contact__c FROM Contact
		 * WHERE Id IN :conIds];
		 * if (!contacts.isEmpty()) {
		 * for (Contact con : contacts) {
		 * con.Lead_Contact__c = true;
		 * conListToUpdate.add(con);
		 * }
		 * }
		 * }
		 *
		 * if (!leadMap.isEmpty()) {
		 * List<Opportunity> opportunities = [SELECT Id, Description FROM Opportunity
		 * WHERE Id IN :leadMap.keySet()];
		 * if (!opportunities.isEmpty()) {
		 * String oppDescription;
		 * for (Opportunity opp : opportunities) {
		 * if (leadMap.containsKey(opp.Id)) {
		 * Lead convertedLead = leadMap.get(opp.Id);
		 * oppDescription = convertedLead.FirstName + +  convertedLead.LastName;
		 * opp.Description = oppDescription;
		 * oppListToUpdate.add(opp);
		 * }
		 * }
		 * }
		 * }
		 *
		 * if (accListToUpdate.size() > 0) {
		 * try {
		 * update accListToUpdate;
		 * } catch (Exception e) {
		 * System.debug('Error while updating the Account Active field :' + e.getMessage());
		 * }
		 * }
		 *
		 * if (conListToUpdate.size() > 0) {
		 * try {
		 * update conListToUpdate;
		 * } catch (Exception e) {
		 * System.debug('Error while updating the Contact checkbox field :' + e.getMessage());
		 * }
		 * }
		 *
		 * if (oppListToUpdate.size() > 0) {
		 * try {
		 * update oppListToUpdate;
		 * } catch (Exception e) {
		 * System.debug('Error while updating the Opportunity description field :' + e.getMessage());
		 * }
		 * }
		 */
		
		/*
		 * Set<Id> accIds = new Set<Id>();
		 * Set<Id> conIds = new Set<Id>();
		 * Map<Id, Lead> leadMap = new Map<Id, Lead>();
		 *
		 * if (!leadRecords.isEmpty()) {
		 * for (Lead leadRec : leadRecords) {
		 * if (leadRec.IsConverted == true) {
		 * accIds.add(leadRec.ConvertedAccountId);
		 * conIds.add(leadRec.ConvertedContactId);
		 * leadMap.put(leadRec.ConvertedOpportunityId, leadRec);
		 * }
		 * }
		 * }
		 *
		 * List<Account> accListToUpdate = new List<Account>();
		 * List<Contact> conListToUpdate = new List<Contact>();
		 * List<Opportunity> oppListToUpdate = new List<Opportunity>();
		 *
		 * if (!accIds.isEmpty()) {
		 * for (Account acc : [SELECT Id, Active__c FROM Account
		 * WHERE Id IN :accIds]) {
		 * acc.Active__c = 'Yes';
		 * accListToUpdate.add(acc);
		 * }
		 * }
		 * if (!conIds.isEmpty()) {
		 * for (Contact con : [SELECT Id, Lead_Contact__c FROM Contact
		 * WHERE Id IN :conIds]) {
		 * con.Lead_Contact__c = true;
		 * conListToUpdate.add(con);
		 * }
		 * }
		 *
		 * if (!leadMap.isEmpty()) {
		 * String oppDescription;
		 * for (Opportunity opp : [SELECT Id, Description FROM Opportunity
		 * WHERE Id IN :leadMap.keySet()]) {
		 * if (leadMap.containsKey(opp.Id)) {
		 * Lead convertedLead = leadMap.get(opp.Id);
		 * oppDescription = convertedLead.FirstName  +   +  convertedLead.LastName;
		 * opp.Description = oppDescription;
		 * oppListToUpdate.add(opp);
		 * }
		 * }
		 * }
		 *
		 * if (accListToUpdate.size() > 0) {
		 * try {
		 * update accListToUpdate;
		 * } catch (Exception e) {
		 * System.debug('Error while updating the Account Active field :' + e.getMessage());
		 * }
		 * }
		 *
		 * if (conListToUpdate.size() > 0) {
		 * try {
		 * update conListToUpdate;
		 * } catch (Exception e) {
		 * System.debug('Error while updating the Contact checkbox field :' + e.getMessage());
		 * }
		 * }
		 *
		 * if (oppListToUpdate.size() > 0) {
		 * try {
		 * update oppListToUpdate;
		 * } catch (Exception e) {
		 * System.debug('Error while updating the Opportunity description field :' + e.getMessage());
		 * }
		 * }
		 */
		
		Set<Id> convertedIds = new Set<Id>();
		if (!leadRecords.isEmpty()) {
			for (Lead leadRec : leadRecords) {
				if (leadRec.IsConverted == true) {
					convertedIds.add(leadRec.Id);
				}
			}
		}
		
		List<Account> accListToUpdate = new List<Account>();
		List<Contact> conListToUpdate = new List<Contact>();
		List<Opportunity> oppListToUpdate = new List<Opportunity>();
		
		if (!convertedIds.isEmpty()) {
			
			List<Lead> leadList = [SELECT Id, Name, convertedAccountId, convertedContactId, convertedOpportunityId FROM Lead WHERE Id IN :convertedIds];
			if (!leadList.isEmpty()) {
				for (Lead leadRec : leadList) {
					if (leadRec.convertedAccountId != null) {
						Account acc = new Account();
						acc.Id = leadRec.ConvertedAccountId;
						acc.Active__c = 'Yes';
						accListToUpdate.add(acc);
					}
					if (leadRec.convertedContactId != null) {
						Contact con = new Contact();
						con.Id = leadRec.convertedContactId;
						con.Lead_Contact__c = true;
						conListToUpdate.add(con);
					}
					if (leadRec.convertedOpportunityId != null) {
						Opportunity opp = new Opportunity();
						opp.Id = leadRec.convertedOpportunityId;
						opp.description = 'Name : ' + leadRec.Name;
						oppListToUpdate.add(opp);
					}
				}
			}
		}
		
		if (accListToUpdate.size() > 0) {
			try {
				update accListToUpdate;
			} catch (Exception e) {
				System.debug('Error while updating the Account Active field :' + e.getMessage());
			}
		}
		
		if (conListToUpdate.size() > 0) {
			try {
				update conListToUpdate;
			} catch (Exception e) {
				System.debug('Error while updating the Contact checkbox field :' + e.getMessage());
			}
		}
		
		if (oppListToUpdate.size() > 0) {
			try {
				update oppListToUpdate;
			} catch (Exception e) {
				System.debug('Error while updating the Opportunity description field :' + e.getMessage());
			}
		}
	}
}
