/**
 * @description       :
 * @author            : Kasi Jangiti
 * @group             :
 * @last modified on  : 10-30-2023
 * @last modified by  : Kasi Jangiti
 **/
public class OpportunityLineItemHandler {
	
	public static void handleOLIevents(List<OpportunityLineItem> oliList) {
		
		Set<Id> oppIds = new Set<Id>();
		if (!oliList.isEmpty()) {
			for (OpportunityLineItem oli : oliList) {
				if (oli.OpportunityId != null) {
					oppIds.add(oli.OpportunityId);
				}
			}
		}
		
		Map<Id, Integer> accMap = new Map<Id, Integer>();
		if (!oppIds.isEmpty()) {
			List<Opportunity> oppsList = [SELECT Id, AccountId FROM Opportunity WHERE Id IN :oppIds];
			if (!oppsList.isEmpty()) {
				for (Opportunity opp : oppsList) {
					accMap.put(opp.AccountId, 0);
				}
			}
		}
		
		Map<Id, Integer> oliToaccMap = new Map<Id, Integer>();
		List<AggregateResult> results = [SELECT Opportunity.AccountId accId, Count(Id) totalCount
										 FROM OpportunityLineItem
										 WHERE Opportunity.AccountId IN :accMap.keySet()
											 AND ListPrice > 50000
										 GROUP BY Opportunity.AccountId];
		if (!results.isEmpty()) {
			for (AggregateResult ar : results) {
				Id accountId = (Id) ar.get('accId');
				Integer count = (Integer) ar.get('totalCount');
				oliToaccMap.put(accountId, count);
			}
		}
		
		List<Account> listToUpdate = new List<Account>();
		for (Id accId : oliToaccMap.keySet()) {
			Id accountId = accId;
			Integer count = oliToaccMap.get(accountId);
			
			Account acc = new Account(Id = accountId, No_of_OLIs__c = count);
			listToUpdate.add(acc);
		}
		
		if (listToUpdate.size() > 0) {
			try {
				update listToUpdate;
			} catch (Exception e) {
				System.debug('Error while updating the Account Line No :' + e.getLineNumber());
				System.debug('Error while updating the Account :' + e.getMessage());
			}
		}
	}
	
	public static void handleAfterUpdateEvent(List<OpportunityLineItem> oliList) {
		Set<Id> oppIds = new Set<Id>();
		if (!oliList.isEmpty()) {
			for (OpportunityLineItem oli : oliList) {
				if (String.isNotBlank(oli.Description)) {
					oppIds.add(oli.OpportunityId);
				}
			}
		}
		
		Map<Id, String> accMap = new Map<Id, String>();
		if (!oppIds.isEmpty()) {
			List<Opportunity> oppsList = [SELECT Id, AccountId,
											  (SELECT Id, Description FROM OpportunityLineItems ORDER BY LastModifiedDate DESC LIMIT 1)
										  FROM Opportunity
										  WHERE Id IN :oppIds];
			if (!oppsList.isEmpty()) {
				for (Opportunity opp : oppsList) {
					if (!opp.OpportunityLineItems.isEmpty()) {
						if (String.isNotBlank(opp.OpportunityLineItems[0].description)) {
							accMap.put(opp.AccountId, opp.OpportunityLineItems[0].Description);
						}
					} else {
						accMap.put(opp.AccountId, 'No OLI records present');
					}
				}
			}
		}
		List<Account> listToUpdate = new List<Account>();
		for (Id acId : accMap.keySet()) {
			Account acc = new Account();
			acc.Id = acId;
			String description = accMap.get(acId);
			if (String.isNotBlank(description)) {
				acc.Description = description;
			}
			listToUpdate.add(acc);
		}
		
		if (listToUpdate.size() > 0) {
			try {
				update listToUpdate;
				System.debug('Account updated successfully');
			} catch (Exception e) {
				System.debug('Error while updating Account Description :' + e.getMessage());
			}
		}
	}
}
