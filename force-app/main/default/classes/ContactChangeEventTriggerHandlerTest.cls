/**
 * @description       :
 * @author            : Kasi Jangiti
 * @group             :
 * @last modified on  : 11-23-2023
 * @last modified by  : Kasi Jangiti
 **/
@isTest
public with sharing class ContactChangeEventTriggerHandlerTest {
	
	@isTest
	static void testChangeDataEvent() {
		
		// Enable the notification for the Change Data Capture in test class
		Test.enableChangeDataCapture();
		
		// Create a Contact instance and insert it
		Contact con = new Contact(FirstName = 'Kiran', LastName = 'Vizag', Email = 'kiran@gmail.com');
		insert con;
		
		// Deliver the Change event
		Test.getEventBus().deliver();
		
		Task[] taskList = [SELECT Id, Subject FROM Task WHERE Subject = 'Contact Record is Created, Please look into it'];
		System.assertEquals(1, taskList.size(), 'Task record creation failed');
		
		Contact updatedContact = [SELECT Id, LastName, FirstName, Email FROM Contact WHERE Id = :con.Id];
		updatedContact.Email = 'kumarpakki@gmail.com';
		update updatedContact;
		
		// Deliver the Change event
		Test.getEventBus().deliver();
		
		taskList = [SELECT Id, Status FROM Task WHERE Subject = 'Contact Record is Updated, Please look into it'];
		System.assertEquals(1, taskList.size(), 'Task Record creation failed while updating Contact');
	}
}
