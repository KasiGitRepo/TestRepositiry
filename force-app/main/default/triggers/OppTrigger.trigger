/**
 * @description       :
 * @author            : Kasi Jangiti
 * @group             :
 * @last modified on  : 10-30-2023
 * @last modified by  : Kasi Jangiti
 **/
trigger OppTrigger on Opportunity (after update, after insert, after delete) {
	
	if (trigger.isAfter && trigger.isUpdate) {
		// OppTriggerHandler.handleTaskRecords(trigger.new,trigger.oldMap);
		// OppTriggerHandler.updateAccount(trigger.new, trigger.oldMap);
		OppTriggerHandler.updateAccountRating(trigger.new, trigger.oldMap);
	}
	
	if (trigger.isAfter && trigger.isInsert) {
		OppTriggerHandler.updateAccountRating(trigger.new, null);
	}
	
	if (trigger.isAfter && trigger.isDelete) {
		OppTriggerHandler.updateAccountRating(trigger.old, null);
	}
}
