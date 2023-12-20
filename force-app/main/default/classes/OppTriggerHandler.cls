/**
 * @description       :
 * @author            : Kasi Jangiti
 * @group             :
 * @last modified on  : 10-30-2023
 * @last modified by  : Kasi Jangiti
 **/
public class OppTriggerHandler {
	 
	/**
	* @description 
	* @author Kasi Jangiti | 10-30-2023 
	* @param List<Opportunity> oppList 
	* @param Map<Id Opportunity> oldMap 
	**/
	public static void handleTaskRecords(List<Opportunity> oppList, Map<Id, Opportunity> oldMap) {
		Set<Id> oppIds = new Set<Id>();
		if (!oppList.isEmpty()) {
			for (Opportunity opp : oppList) {
				oppIds.add(opp.Id);
			}
		}
		
		Map<Id, Task> taskMap = new Map<Id, Task>();
		if (!oppIds.isEmpty()) {
			List<Task> taskList = [SELECT Id, WhatId, Description FROM Task WHERE WhatId IN :oppIds];
			if (!taskList.isEmpty()) {
				for (Task eachTask : taskList) {
					taskMap.put(eachTask.WhatId, eachTask);
				}
			}
		}
		
		List<Task> listToUpdate = new List<task>();
		List<Task> listToInsert = new List<task>();
		if (!oppList.isEmpty()) {
			for (Opportunity opprec : oppList) {
				if (opprec.StageName != oldMap.get(opprec.Id).StageName && opprec.StageName != null) {
					if (taskMap.containsKey(opprec.Id)) {
						Task existingTask = new Task();
						existingTask.Id = taskMap.get(opprec.Id).Id;
						existingTask.WhatId = opprec.Id;
						existingTask.Description = 'Opportunity Stage has beed updated by Trigger';
						listToUpdate.add(existingTask);
					} else {
						Task newTask = new Task();
						newTask.WhatId = opprec.Id;
						newTask.Description = 'Stage has been changed';
						newTask.ActivityDate = Date.TODAY() + 2;
						newTask.Priority = 'Medium';
						newTask.OwnerId = opprec.OwnerId;
						newTask.Status = 'In Progress';
						listToInsert.add(newTask);
					}
				}
			}
		}
		
		if (listToUpdate.size() > 0) {
			try {
				update listToUpdate;
			} catch (Exception e) {
				System.debug('Error while updating the task record :' + e.getMessage());
			}
		}
		
		if (listToInsert.size() > 0) {
			try {
				insert listToInsert;
			} catch (Exception e) {
				System.debug('Error while inserting the task record :' + e.getMessage());
			}
		}
	}
	
	/**
	* @description 
	* @author Kasi Jangiti | 10-30-2023 
	* @param List<Opportunity> oppsList 
	* @param Map<Id Opportunity> oldMap 
	**/
	public static void updateAccount(List<Opportunity> oppsList, Map<Id, Opportunity> oldMap) {
		Set<Id> accIds = new Set<Id>();
		if (!oppsList.isEmpty()) {
			for (Opportunity newOpp : oppsList) {
				if (oldMap != null) {
					Opportunity oldOpp = oldMap.get(newopp.Id);
					if (newOpp.AccountId != oldOpp.AccountId) {
						accIds.add(newOpp.AccountId);
						accIds.add(oldOpp.AccountId);
					}
				}
			}
		}
		Map<Id, List<Opportunity>> accMap = new Map<Id, List<Opportunity>>();
		if (!accIds.isEmpty()) {
			List<Opportunity> opps = [SELECT Id, AccountId, StageName FROM Opportunity WHERE AccountId IN :accIds];
			if (!opps.isEmpty()) {
				for (Opportunity oppRec : opps) {
					if (accMap.containsKey(oppRec.AccountId)) {
						accMap.get(oppRec.AccountId).add(oppRec);
					} else {
						accMap.put(oppRec.AccountId, new List<Opportunity>());
					}
				}
			}
		}
		List<Account> listToUpdate = new List<Account>();
		for (Id accId : accMap.keySet()) {
			List<Opportunity> accOpps = accMap.get(accId);
			if (!accOpps.isEmpty()) {
				Boolean allClosed = true;
				for (Opportunity eachOpp : accOpps) {
					if (!eachOpp.StageName.equals('Closed Won')) {
						allClosed = false;
						break;
					}
				}
				if (allClosed) {
					listToUpdate.add(new Account(Id = accId, Account_Status__c = 'Closed'));
				} else {
					listToUpdate.add(new Account(Id = accId, Account_Status__c = 'Open'));
				}
			}
		}
		
		if (listToUpdate.size() > 0) {
			try {
				update listToUpdate;
			} catch (Exception e) {
				System.debug('Error while updating the Account Status field :' + e.getMessage());
			}
		}
	}
	
	/**
	* @description 
	* @author Kasi Jangiti | 10-30-2023 
	* @param List<Opportunity> opportunities 
	* @param Map<Id Opportunity> oldMap 
	**/
	public static void updateAccountRating(List<Opportunity> opportunities, Map<Id, Opportunity> oldMap) {
		
        Set<Id> accIds = new Set<Id>();

		if (!opportunities.isEmpty()) {
			for (Opportunity newOpp : opportunities) {
				// For update event
				if (oldMap != null) {
					Opportunity oldOpp = oldMap.get(newOpp.Id);
					// If the Parent Account is changed
					if ( newOpp.AccountId != oldOpp.AccountId) {
						accIds.add(newOpp.AccountId);
						accIds.add(oldOpp.AccountId);
					}
					// If the opportunity amount is changed, update event
					else if (oldOpp.Amount != newOpp.Amount) {
						accIds.add(newOpp.AccountId);
					}
					// For Insert, Undelete,and Delete events
				} else {
					accIds.add(newOpp.AccountId);
				}
			}
		}

		Map<Id, Decimal> accMap = new Map<Id, Decimal>();
		if (!accIds.isEmpty()) {
			List<Opportunity> oppsList = [SELECT Id, AccountId, Amount FROM Opportunity 
                                            WHERE AccountId IN :accIds];
			if (!oppsList.isEmpty()) {
				for (Opportunity opp : oppsList) {
                //If parent account exist in the Map(from second opportunity, it will come to If block)
				 if(accMap.containsKey(opp.AccountId)){
                    //Add current opportunity amount to the previous amount
                    accMap.put(opp.AccountId, accMap.get(opp.AccountId) + opp.Amount);
                 }else{
                    //For the first opportunity, it will come to else block
                    //If parent account not exist, add the current opportunity amount
                    accMap.put(opp.AccountId, opp.Amount);
                 }
			}
		}

		Map<Id, Account> accToUpdateMap = new Map<Id, Account>();
		for (Id accId : accMap.keySet()) {
			// If parent account contains in the map
			if (accMap.containsKey(accId)) {
				// Get the total amount of opportunity
				Decimal totalAmount = accMap.get(accId);
				String rating = '';
				Integer coldThreshold = 50000;
				Integer warmThreshould = 100000;
				
				if (totalAmount <= coldThreshold) {
					rating = 'Cold';
				} else if (totalAmount <= warmThreshould) {
					rating = 'Warm';
				} else {
					rating = 'Hot';
				}
                Account acc = new Account(Id = accId, Rating = rating);
				accToUpdateMap.put(acc.Id, acc);
			}
		}

		if (accToUpdateMap.size() > 0) {
			try {
				update accToUpdateMap.values();
				System.debug('Account Rating updated successfully');
			} catch (Exception e) {
				System.debug('Error while updating the Account rating :' + e.getMessage());
			}
		}
	 }
   }
}