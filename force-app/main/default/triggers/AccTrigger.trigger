/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 10-31-2023
 * @last modified by  : Kasi Jangiti
**/
trigger AccTrigger on Account (after update) {

    if(trigger.isAfter && trigger.isUpdate){
        AccTriggerHandler.updateChildRecords(trigger.new, trigger.oldMap);
    }
}