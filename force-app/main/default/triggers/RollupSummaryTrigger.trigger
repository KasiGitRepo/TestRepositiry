/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 09-14-2023
 * @last modified by  : Kasi Jangiti
**/
trigger RollupSummaryTrigger on Opportunity (after insert) {

 //Without best practices and not consider Governor Limits
 /*
 for(Opportunity oppRecord: trigger.New){
    Account account = [SELECT Id,Name,No_of_Child_Opportunities__c from Account WHERE Id =: oppRecord.AccountId];
    List<Opportunity> oppList = [SELECT Id,AccountId from Opportunity WHERE AccountId  =: account.Id];
    account.No_of_Child_Opportunities__c = oppList.size();
    update account;
   }
*/

   Set<Id> accountIds = new Set<Id>();
   for(Opportunity currOpp : Trigger.New){
       if(currOpp.AccountId != null){
           accountIds.add(currOpp.AccountId);
       }
   }

   List<Account> accList = [select Id, No_of_Child_Opportunities__c from Account Where Id IN : accountIds];
   Map<Id,List<Opportunity>> oppToaccMap = new Map<Id,List<Opportunity>>();
   List<Opportunity> oppsList = [select Id,AccountId from Opportunity Where AccountId IN : accountIds];
   
   if(oppsList.size()>0){
    for(Opportunity opp : oppsList){
      if(oppToaccMap.containsKey(opp.AccountId)){
          oppToaccMap.get(opp.AccountId).add(opp);
      }else{
          oppToaccMap.put(opp.AccountId, new List<Opportunity>{opp});
      } 
    }
  }

  List<Account> listToUpdate = new List<Account>();
  for(Account acc : accList){
    acc.No_of_Child_Opportunities__c = oppToaccMap.get(acc.Id).size();
    listToUpdate.add(acc);
  }
    if(listToUpdate.size()>0){
        try{
            update listToUpdate;
        }catch(Exception e){
            System.debug(e.getMessage());
        }        
     }
  }
