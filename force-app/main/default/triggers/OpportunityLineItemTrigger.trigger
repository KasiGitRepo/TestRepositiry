/**
 * @description       :
 * @author            : Kasi Jangiti
 * @group             :
 * @last modified on  : 10-30-2023
 * @last modified by  : Kasi Jangiti
 **/
trigger OpportunityLineItemTrigger on OpportunityLineItem (after insert, after delete, after update) {
	
	if (trigger.isAfter && trigger.isInsert) {
		OpportunityLineItemHandler.handleOLIevents(trigger.new);
	}
	
	if (trigger.isAfter && trigger.isDelete) {
		OpportunityLineItemHandler.handleOLIevents(trigger.old);
        OpportunityLineItemHandler.handleAfterUpdateEvent(trigger.old);
	}
	
	if (trigger.isAfter && (trigger.isUpdate || trigger.isInsert)){
		OpportunityLineItemHandler.handleAfterUpdateEvent(trigger.new);
	}
	
}
