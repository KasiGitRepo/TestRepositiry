/**
 * @description       :
 * @author            : Kasi Jangiti
 * @group             :
 * @last modified on  : 10-14-2023
 * @last modified by  : Kasi Jangiti
 **/
public with sharing class OpportunityHandlerforWireProperty {
	
	@AuraEnabled(cacheable=true)
	public static List<Opportunity> getOpportunities() {
		return [SELECT Name, StageName, CloseDate, Type, Amount FROM Opportunity USER_MODE LIMIT 10];
	}
}
