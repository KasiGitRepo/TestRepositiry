/**
 * @description       :
 * @author            : Kasi Jangiti
 * @group             :
 * @last modified on  : 11-01-2023
 * @last modified by  : Kasi Jangiti
 **/
public with sharing class ConTriggerHandler {
	public static void updateFieldwithParentRecord(List<Contact> contacts, Map<Id, Contact> oldMap) {
		Set<Id> accIds = new Set<Id>();
		Map<Id, String> accMap = new Map<Id, String>();
		// For insert operation
		if (!contacts.isEmpty() && oldMap == null) {
			for (Contact con : contacts) {
				if (con.AccountId != null) {
					accIds.add(con.AccountId);
				}
			}
			
			if (!accIds.isEmpty()) {
				List<Account> accList = [SELECT Id, RecordType.Name FROM Account WHERE Id IN :accIds];
				if (!accList.isEmpty()) {
					for (Account acc : accList) {
						if (acc.RecordType.Name != null) {
							accMap.put(acc.Id, acc.RecordType.Name);
						}
					}
				}
			}
			
			for (Contact con : contacts) {
				String accountRecordType = accMap.get(con.AccountId);
				if (accountRecordType != null) {
					if (accountRecordType == 'Record Type A') {
						con.Contact_Type__c = 'Record Type A';
					} else if (accountRecordType == 'Record Type B') {
						con.Contact_Type__c = 'Record Type B';
					}
				}
			}
		}
		// For update operation
		else {
			for (Contact conRec : contacts) {
				if (conRec.Contact_Type__c != oldMap.get(conRec.Id).Contact_Type__c) {
					String accountRecordType = accMap.get(conRec.AccountId);
					if (conRec.Contact_Type__c != accountRecordType) {
						conRec.addError('You cannot update the Contact Type without updating the Parent Record Type');
					}
				}
			}
		}
	}
	
	//If you don't use future method, you will get an error called Mixed DML Exception
	@future
	public static void createUserAndAddToGroup(List<Id> contactIds) {
		
		List<Contact> contacts = [SELECT Id, LastName, FirstName, Email, Phone FROM Contact WHERE Id IN :contactIds];
		
		List<User> userListToInsert = new List<User>();
		Profile userProfile = [SELECT Id, Name FROM Profile WHERE Name = 'Force.com - Free User' LIMIT 1];
		if (!contacts.isEmpty()) {
			for (Contact con : contacts) {
				if (String.isNotBlank(con.FirstName) || String.isNotBlank(con.Email) || String.isNotBlank(con.Phone)) {
					User currUser = new User();
					currUser.FirstName = con.FirstName;
					currUser.LastName = con.LastName;
					currUser.Email = con.Email;
					currUser.Phone = con.Phone;
					currUser.Username = 'comuser' + con.Email;
					currUser.ProfileId = userProfile.Id;
					currUser.Alias = 'Ualias';
					currUser.TimeZoneSidKey = '	Asia/Kolkata';
					currUser.LocaleSidKey = 'en_IN';
					currUser.EmailEncodingKey = 'UTF-8';
					currUser.LanguageLocaleKey = 'en_US';
					currUser.ContactId = con.Id;
					userListToInsert.add(currUser);
				}
			}
		}
		if (userListToInsert.size() > 0) {
			try {
				insert userListToInsert;
			} catch (Exception e) {
				System.debug('Error While inserting User record :' + e.getMessage());
			}
		}
		List<GroupMember> memberListToInsert = new List<GroupMember>();
		Group communityGroup = [SELECT Id, Name FROM Group WHERE Name = 'Community Users Group' LIMIT 1];
		if (!userListToInsert.isEmpty()) {
			for (User eachUser : userListToInsert) {
				GroupMember member = new GroupMember();
				member.groupId = communityGroup.Id;
				member.UserOrGroupId = eachUser.Id;
				memberListToInsert.add(member);
			}
		}
		
		if (memberListToInsert.size() > 0) {
			try {
				insert memberListToInsert;
			} catch (Exception e) {
				System.debug('Error While inserting GroupMember record :' + e.getMessage());
			}
		}
	}
}
