public class Task_Opp_Acc_Trig_Handler {

    public static void createTaskRecord(List<Opportunity> oldOpps){
        //From Task to Opportunity then from Opportunity to Account then Account to Owner
       Set<Id> accIds = new Set<Id>(); 
        Map<Id,Id> oppVsaccMap = new Map<Id,Id>();
        for(Opportunity opp : oldOpps){
            accIds.add(opp.AccountId);
            oppVsaccMap.put(opp.Id,opp.AccountId);
        }
        Map<Id,Id> accVsOwnerMap = new Map<Id,Id>();
        List<Account> accList = [SELECT Id,Name,OwnerId FROM Account WHERE Id IN : accIds];
        for(Account acc : accList){
            accVsOwnerMap.put(acc.Id,acc.OwnerId);
        }
        List<Task> taskList = new List<task>(); 
        for(Opportunity op : oldOpps){
            Task taskRec = new Task();
            taskRec.Status = 'Not Started';
            taskRec.OwnerId = accVsOwnerMap.get(oppVsaccMap.get(op.Id));
            taskRec.Priority = 'High';
            taskRec.Subject = 'Opportunity deleted';
            taskRec.WhatId = oppVsaccMap.get(op.Id);
            taskList.add(taskRec);
        }
        if(!taskList.isEmpty())
            Database.insert(taskList);
        
    }
}