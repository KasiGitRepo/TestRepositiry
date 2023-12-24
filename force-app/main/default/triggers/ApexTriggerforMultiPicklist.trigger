/**
 * @description       :
 * @author            : Kasi Jangiti
 * @group             :
 * @last modified on  : 12-20-2023
 * @last modified by  : Kasi Jangiti
 **/
trigger ApexTriggerforMultiPicklist on Account (after insert, after update) {
	
	if (Trigger.isAfter && (Trigger.isInsert || Trigger.isUpdate)) {
		ApexTriggerforMultiPicklistHandler.handleAfterInsertEvents(Trigger.new, Trigger.oldMap);
	}
}