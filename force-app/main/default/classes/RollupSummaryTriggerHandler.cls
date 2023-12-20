/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 09-14-2023
 * @last modified by  : Kasi Jangiti
**/
public with sharing class RollupSummaryTriggerHandler {
    
    public void updateAccountField(List<Opportunity> oppList){
        Set<Id> accountIds = new Set<Id>();
        for(Opportunity opp : oppList){
            if(opp.AccountId != null){
                accountIds.add(opp.AccountId);
            }
        }

        List<Account> accRecords = [Select Id,No_of_Child_Opportunities__c from Account Where Id IN : accountIds];
        Map<Id,List<Opportunity>> oppToaccMap = new Map<Id,List<Opportunity>>();
        List<Opportunity> oppRecords = [Select Id,AccountId from Opportunity Where AccountId IN : accountIds];
        if(!oppRecords.isEmpty()){
            for(Opportunity currOpp: oppRecords){
                if(oppToaccMap.containsKey(currOpp.AccountId)){
                    oppToaccMap.get(currOpp.AccountId).add(currOpp);
                }else{
                    oppToaccMap.put(currOpp.AccountId, new List<Opportunity{currOpp})
                }
            }
        }
        List<Account> updateAccountList = new List<Account>();
        for(Account acc : accRecords){
         acc.No_of_Child_Opportunities__c = oppToaccMap.get(acc.Id).size();
         updateAccountList.add(acc);
        }
        if(updateAccountList.size()>0){
            try{
                update updateAccountList ;
            }catch(Exception e){
                System.debug('Error Message:' + e.getMessage());
            }
        }
    }
}