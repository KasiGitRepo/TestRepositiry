/**
 * @description       :
 * @author            : Kasi Jangiti
 * @group             :
 * @last modified on  : 10-20-2023
 * @last modified by  : Kasi Jangiti
 **/
public with sharing class OpportunityHandler {
	
	@AuraEnabled(cacheable=true)
	public static List<Opportunity> getOppsList() {
		List<Opportunity> oppList = [SELECT Id, Name, StageName, AccountId, 
                                      CloseDate, Amount, LeadSource FROM Opportunity 
                                      WHERE AccountId != null WITH USER_MODE LIMIT 12];

        return oppList;                              
	}
}
