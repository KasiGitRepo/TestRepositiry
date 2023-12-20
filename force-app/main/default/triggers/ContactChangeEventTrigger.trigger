/**
 * @description       :
 * @author            : Kasi Jangiti
 * @group             :
 * @last modified on  : 11-23-2023
 * @last modified by  : Kasi Jangiti
 **/
trigger ContactChangeEventTrigger on ContactChangeEvent (after insert) {
	
	if (Trigger.isAfter && Trigger.isInsert) {
		ContactChangeEventTriggerHandler.handleAfterInsertEvents(Trigger.New);
	}
}
