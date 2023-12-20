/**
 * @description       :
 * @author            : Kasi Jangiti
 * @group             :
 * @last modified on  : 11-27-2023
 * @last modified by  : Kasi Jangiti
 **/
public with sharing class CSVcontroller {
	@AuraEnabled(cacheable=true)
	public static List<Account> getAccountRecords() {
		return [SELECT Id, Name, Phone, AnnualRevenue, Rating, Industry, Type FROM Account USER_MODE];
	}
}
