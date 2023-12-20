/**
 * @description       :
 * @author            : Kasi Jangiti
 * @group             :
 * @last modified on  : 11-01-2023
 * @last modified by  : Kasi Jangiti
 **/
trigger CaseTrigger on Case (before insert, after insert, after update, after delete, after undelete) {
	
	if (trigger.isBefore && trigger.isInsert) {
		CaseTriggerHandler.updateAccountAndEvent(trigger.new);
	}
	
	if (trigger.isAfter && (trigger.isInsert || trigger.isUndelete)) {
		CaseTriggerHandler.handleAfterEvents(trigger.new, null);
		CaseTriggerHandler.updateAccountRatingByNoOfCases(trigger.new, null);
	}
	
	if (trigger.isAfter && trigger.isUpdate) {
		// CaseTriggerHandler.handleAfterEvents(trigger.new, trigger.oldMap);
		// CaseTriggerHandler.updateAccountRatingByNoOfCases(trigger.new, trigger.oldMap);
		CaseTriggerHandler.updateAccountAndTask(trigger.new, trigger.oldMap);
		
	}
	
	if (trigger.isAfter && trigger.isDelete) {
		CaseTriggerHandler.handleAfterEvents(trigger.old, null);
		CaseTriggerHandler.updateAccountRatingByNoOfCases(trigger.old, null);
	}
}
