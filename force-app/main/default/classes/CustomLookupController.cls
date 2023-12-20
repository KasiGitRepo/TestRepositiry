/**
 * @description       :
 * @author            : Kasi Jangiti
 * @group             :
 * @last modified on  : 11-27-2023
 * @last modified by  : Kasi Jangiti
 **/
public with sharing class CustomLookupController {
	
	@AuraEnabled(cacheable=true)
	public static List<sObject> fetchLookupData(String serachText, String ObjectApiName) {
		List<sObject> sObjectList = new List<sObject>();
		if (String.isBlank(serachText)) {
			return sObjectList;
		} else {
			String key = '%' + serachText + '%';
			//String query = 'SELECT Id,Name ' + ObjectName + ' Where Name Like ' + string.escapeSingleQuotes(key) + ' Order by Name DESC Limit 10';
			String query = 'SELECT Id,Name ' + ObjectName + ' Where Name Like key Order by Name DESC Limit 10';
            sObjectList = Database.query(query, AccessLevel.USER_MODE);
			return sObjectList;
		}
	}
}
