/**
 * @description       :
 * @author            : Kasi Jangiti
 * @group             :
 * @last modified on  : 12-05-2023
 * @last modified by  : Kasi Jangiti
 **/

/**
 * @description       :
 * @author            : Kasi Jangiti
 * @group             :
 * @last modified on  : 12-05-2023
 * @last modified by  : Kasi Jangiti
 **/
public with sharing class apexLWCAccountController {
	
	@AuraEnabled(cacheable=true)
	public static List<Account> getAccountList() {
		return [SELECT id, Name, Type, Industry, Rating, AnnualRevenue FROM Account WHERE Type != ''];
	}
	
	@AuraEnabled(cacheable=true)
	public static List<Account> fetchAccountsByType(String type) {
		return [SELECT Id, Name, Type, Industry, Phone FROM Account WHERE Type = :type];
	}
	
	@AuraEnabled(cacheable=true)
	public static List<Account> fetchAccountsByIndustry(String industri) {
		return [SELECT Id, Name, Type, Industry, Rating, AnnualRevenue, Phone FROM Account WHERE Industry = :industri];
	}
	
	// Method Imperatively
	@AuraEnabled(cacheable=true)
	public static List<Account> fetchAccountRecords() {
		return [SELECT Id, Name, Rating, Industry, Type, Phone FROM Account WITH USER_MODE LIMIT 10];
	}
	
	@AuraEnabled(cacheable=true)
	public static List<Account> fetchAccountRecordsbyFilter(String inputIndustry) {
		return [SELECT Id, Name, Rating, Industry, Type, Phone FROM Account WHERE Industry = :inputIndustry WITH USER_MODE];
	}
}
