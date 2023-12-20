/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 11-01-2023
 * @last modified by  : Kasi Jangiti
**/
trigger ConTrigger on Contact (before insert, before update, after insert) {

     if(trigger.isBefore && trigger.isInsert ){
      //  ConTriggerHandler.updateFieldwithParentRecord(trigger.new, null);
     }

     if(trigger.isBefore &&  trigger.isUpdate){
        ConTriggerHandler.updateFieldwithParentRecord(trigger.new, trigger.oldMap);
     }
     
     if(trigger.isAfter &&  trigger.isInsert){
      List<Id> conIds = new List<Id>();
       for(Contact con : trigger.new){
           conIds.add(con.Id);
       }
      ConTriggerHandler.createUserAndAddToGroup(conIds);
     }
}