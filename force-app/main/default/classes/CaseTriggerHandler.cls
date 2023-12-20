/**
 * @description       :
 * @author            : Kasi Jangiti
 * @group             :
 * @last modified on  : 11-01-2023
 * @last modified by  : Kasi Jangiti
 **/
public with sharing class CaseTriggerHandler {
	
	/**
	 * @description
	 * @author Kasi Jangiti | 10-30-2023
	 * @param List<Case> caseList
	 * @param Map<Id Case> oldMap
	 **/
	public static void handleAfterEvents(List<Case> caseList, Map<Id, Case> oldMap) {
		Map<Id, Integer> newStausMap = new Map<id, Integer>();
		Map<Id, Integer> workingStausMap = new Map<id, Integer>();
		Map<Id, Integer> escalatedStausMap = new Map<id, Integer>();
		Set<Id> accIds = new Set<Id>();
		if (!caseList.isEmpty()) {
			for (Case newCase : caseList) {
				if (oldMap != null) {
					Case oldCase = oldMap.get(newCase.Id);
					if (newCase.AccountId != oldCase.AccountId) {
						accIds.add(oldCase.AccountId);
						accIds.add(newCase.AccountId);
					} else if (newCase.Status != oldCase.Status) {
						accIds.add(newCase.AccountId);
					}
				} else {
					accIds.add(newCase.AccountId);
				}
			}
		}
		Map<Id, Account> accToUpdateMap = new Map<Id, Account>();
		if (!accIds.isEmpty()) {
			
			for (Account acc : [SELECT Id, Account_New_Case_Status__c, Account_Escalated_Case_Status__c, Account_Working_Case_Status__c,
									(SELECT Id, Status FROM Cases)
								FROM Account
								WHERE Id IN :accIds]) {
				newStausMap.put(acc.Id, 0);
				workingStausMap.put(acc.Id, 0);
				escalatedStausMap.put(acc.Id, 0);
				
				if (!acc.Cases.isEmpty()) {
					for (Case eachCase : acc.Cases) {
						if (eachCase.Status == 'New') {
							newStausMap.put(acc.Id, newStausMap.get(acc.Id) + 1);
						} else if (eachCase.Status == 'Working') {
							workingStausMap.put(acc.Id, workingStausMap.get(acc.Id) + 1);
						} else if (eachCase.Status == 'Escalated') {
							escalatedStausMap.put(acc.Id, escalatedStausMap.get(acc.Id) + 1);
						}
					}
				}
				
				if (newStausMap.get(acc.Id) != acc.Account_New_Case_Status__c || workingStausMap.get(acc.Id) != acc.Account_Working_Case_Status__c || escalatedStausMap.get(acc.Id) != acc.Account_Escalated_Case_Status__c) {
					acc.Account_New_Case_Status__c = newStausMap.get(acc.Id);
					acc.Account_Working_Case_Status__c = workingStausMap.get(acc.Id);
					acc.Account_Escalated_Case_Status__c = escalatedStausMap.get(acc.Id);
					accToUpdateMap.put(acc.Id, acc);
				}
			}
		}
		
		if (accToUpdateMap.size() > 0) {
			try {
				update accToUpdateMap.values();
			} catch (Exception e) {
				System.debug('Error While updating the Case Status count on Account :' + e.getMessage());
			}
		}
	}
	
	public static void updateAccountRatingByNoOfCases(List<Case> caseList, Map<Id, Case> oldMap) {
		Set<Id> accIds = new Set<Id>();
		if (!caseList.isEmpty()) {
			for (Case newCase : caseList) {
				if (oldMap != null) {
					Case oldCase = oldMap.get(newCase.Id);
					if (oldCase.AccountId != newCase.AccountId && newCase.AccountId != null) {
						accIds.add(newCase.AccountId);
						accIds.add(oldCase.AccountId);
					} else if (newCase.Status != oldCase.Status) {
						accIds.add(newCase.AccountId);
					}
				} else {
					accIds.add(newCase.AccountId);
				}
			}
		}
		
		Map<Id, Integer> accVscaseMap = new Map<Id, Integer>();
		
		if (!accIds.isEmpty()) {
			
			List<AggregateResult> results = [SELECT Count(Id) totalCount, AccountId
											 FROM Case
											 WHERE AccountId IN :accIds
												 AND Status = 'Case Closed'
											 GROUP BY AccountId];
			if (!results.isEmpty()) {
				for (AggregateResult ag : results) {
					Id accId = (Id) ag.get('AccountId');
					Integer count = (Integer) ag.get('totalCount');
					accVscaseMap.put(accId, count);
				}
			}
		}
		
		List<Account> listToUpdate = new List<Account>();
		if (!accIds.isEmpty()) {
			List<Account> accRecords = [SELECT Id, Rating FROM Account WHERE Id IN :accIds];
			if (!accRecords.isEmpty()) {
				for (Account acc : accRecords) {
					Integer noOfClosedCases = accVscaseMap.containsKey(acc.Id) ? accVscaseMap.get(acc.Id) : 0;
					String accountRating;
					
					if (noOfClosedCases <= 2) {
						accountRating = 'Cold';
					}
					if (noOfClosedCases > 2 && noOfClosedCases < 5) {
						accountRating = 'Warm';
					}
					if (noOfClosedCases > 5) {
						accountRating = 'Hot';
					}
					
					acc.Rating = accountRating;
					listToUpdate.add(acc);
				}
			}
		}
		
		if (listToUpdate.size() > 0) {
			try {
				update listToUpdate;
			} catch (Exception e) {
				System.debug('Error while updating the Account rating :' + e.getMessage());
			}
		}
	}
	
	public static void updateAccountAndTask(List<Case> caseRecords, Map<Id, Case> oldMap) {
		
		Map<Id, String> caseMap = new Map<Id, String>();
		Set<Id> accIds = new Set<Id>();
		
		List<Task> listOfTasksToUpdate = new List<Task>();
		List<Account> accListToUpdate = new List<Account>();
		if (!caseRecords.isEmpty()) {
			for (Case newCase : caseRecords) {
				if (!oldMap.isEmpty()) {
					Case oldCase = oldMap.get(newCase.Id);
					if (newCase.AccountId != null && newCase.Status != oldCase.Status) {
						accIds.add(newCase.AccountId);
						caseMap.put(newCase.Id, newCase.Status);
					}
				}
			}
		}
		
		if (!caseMap.isEmpty()) {
			for (Task eachTask : [SELECT Id, WhatId, Status FROM Task WHERE WhatId IN :caseMap.keySet()]) {
				String taskStatus;
				if (caseMap.containsKey(eachTask.WhatId)) {
					taskStatus = caseMap.get(eachTask.WhatId);
				}
				eachTask.Status = taskStatus;
				listOfTasksToUpdate.add(eachTask);
			}
		}
		
		Map<Id, Case> caseToaccMap = new Map<Id, Case>();
		if (!accIds.isEmpty()) {
			Map<Id, Account> accMap = new Map<Id, Account>([SELECT Id, Description FROM Account WHERE Id IN :accIds]);
			
			for (Case currCase : [SELECT Id, AccountId, Status, CaseNumber FROM Case WHERE AccountId IN :accIds]) {
				if (currCase.Status != null) {
					if (!caseToaccMap.containsKey(currCase.AccountId)) {
						caseToaccMap.put(currCase.AccountId, currCase);
					}
				}
			}
			
			for (Account acc : accMap.values()) {
				if (caseToaccMap.containsKey(acc.Id)) {
					Case caseRecord = caseToaccMap.get(acc.Id);
					String accDescription = 'Case Number : ' + caseRecord.CaseNumber + ' Case Status Changed to : ' + caseRecord.Status;
					if (accDescription != null) {
						acc.Description = accDescription;
						accListToUpdate.add(acc);
					}
				}
			}
		}
		if (accListToUpdate.size() > 0) {
			update accListToUpdate;
		}
		
		if (listOfTasksToUpdate.size() > 0) {
			update listOfTasksToUpdate;
		}
	}
	
	public static void updateAccountAndEvent(List<Case> caseRecords) {
		
		Set<Id> accIds = new Set<Id>();
		Map<Id, Contact> conMap = new Map<Id, Contact>();
		List<Event> eventListToInsert = new List<Event>();
		if (!caseRecords.isEmpty()) {
			for (Case eachCase : caseRecords) {
				if (eachCase.AccountId != null && String.isNotBlank(eachCase.Subject)) {
					accIds.add(eachCase.AccountId);
				}
			}
		}
		
		if (!accIds.isEmpty()) {
			for (Contact conRec : [SELECT Id, AccountId, Primary_Contact__c
								   FROM Contact
								   WHERE AccountId IN :accIds
									   AND Primary_Contact__c = true
								   ORDER BY LastModifiedDate DESC
								   LIMIT 1]) {
				conMap.put(conRec.AccountId, conRec);
			}
			
			if (!caseRecords.isEmpty()) {
				for (Case caseRec : caseRecords) {
					if (caseRec.AccountId != null && caseRec.ContactId == null && !conMap.isEmpty()) {
						Contact contactRec = conMap.get(caseRec.AccountId);
						caseRec.ContactId = contactRec.Id;
						
						Datetime currenttime = Datetime.now();
						Datetime startDateTime = currenttime.addDays(2);
						Datetime endDateTime = startDateTime.addHours(2);
						
						Event newEvent = new Event();
						newEvent.WhoId = contactRec.Id;
						newEvent.WhatId = caseRec.AccountId;
						newEvent.startDateTime = startDateTime;
						newEvent.endDateTime = endDateTime;
						newEvent.Subject = caseRec.Subject;
						eventListToInsert.add(newEvent);
						
						if (eventListToInsert.size() > 0) {
							try {
								insert eventListToInsert;
							} catch (Exception e) {
								System.debug('Error occured while inserting Event record :' + e.getMessage());
							}
						}
						
					} else if (caseRec.AccountId != null && conMap.isEmpty()) {
						caseRec.addError('You don\'t have primary contact for the selected Account');
					}
				}
			}
			
		}
	}
}
