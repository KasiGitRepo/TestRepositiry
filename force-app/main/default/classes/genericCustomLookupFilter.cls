/**
 * @description       : This will fetch data of generic sObject based on input value
 * @author            : Kasi Jangiti
 * @group             :
 * @last modified on  : 10-14-2023
 * @last modified by  : Kasi Jangiti
 **/
public with sharing class genericCustomLookupFilter {
	
	@AuraEnabled(cacheable=true)
	public static List<sObject> fetchsObjectRecords(String objectApiName, String searchKey) {
		List<SObject> sObjectList = new List<SObject>();
		if (String.isNotBlank(searchKey)) {
			String key = '%' + searchKey + '%';
			String queryString = 'SELECT Id,Name FROM ' + objectApiName + ' WHERE Name LIKE :key LIMIT 10';
			sObjectList = Database.query(queryString, AccessLevel.USER_MODE);
		}
		return sObjectList;
	}
}
