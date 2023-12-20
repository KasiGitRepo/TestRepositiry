/**
 * @description       :
 * @author            : Kasi Jangiti
 * @group             :
 * @last modified on  : 10-13-2023
 * @last modified by  : Kasi Jangiti
 **/
public with sharing class sObjectDataHandler {
	
	@AuraEnabled(cacheable=true)
	public static List<sObject> getResults(String objectName, String searchKey) {
		List<sObject> sObjectList = new List<sObject>();
		if (String.isNotBlank(searchKey)) {
			String key = '%' + searchKey + '%';
			String queryString = 'SELECT Id,Name FROM ' + objectName + ' WHERE Name Like :key ';
			sObjectList = Database.query(queryString, AccessLevel.USER_MODE);
		}
		return sObjectList;
	}
}
