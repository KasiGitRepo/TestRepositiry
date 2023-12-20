/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 10-31-2023
 * @last modified by  : Kasi Jangiti
**/
trigger LeadTrigger on Lead (after update) {

    if(trigger.isAfter && trigger.isUpdate){
       // LeadTriggerHandler.updateConvertedLeads(trigger.new);
        LeadTriggerHandler.handleConvertedRecords(trigger.new);
    }
}