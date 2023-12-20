trigger RollupSummaryOnAccount on Opportunity (after insert, after update, after delete) {
    
    if(Trigger.isAfter && Trigger.isInsert){
      
        //Without Map and Single for loop
      /*  
        Set<Id> allAcocountIds = new Set<Id>();
        for(Opportunity oppRec : Trigger.New){
            if(OppRec.AccountId != null){
                allAcocountIds.add(OppRec.AccountId);
            }
        }
     List<Account> accountsList = [SELECT Id, No_of_Opps__c, 
                                    (SELECT Id,AccountId FROM Opportunities) 
                                   FROM Account WHERE Id IN : allAcocountIds];
        
        List<Account> listToBeUpdated = new List<Account>();
        if(!accountsList.isEmpty()){
            for(Account accRec: accountsList){
                accRec.No_of_Opps__c = accRec.Opportunities.size();
                listToBeUpdated.add(accRec);
            }
        }
        if(listToBeUpdated.size()>0){
            try{
              update listToBeUpdated;
                System.debug('Rollup Summary trigger is fired');
            }catch(Exception e){
                System.debug('Error Message:' + e.getMessage());
            }            
        }
  */
      
       //With two SOQL quaries,Map and single for loop
        /*
          Set<Id> allAcocountIds = new Set<Id>();
        for(Opportunity oppRec : Trigger.New){
            if(OppRec.AccountId != null){
                allAcocountIds.add(OppRec.AccountId);
            }
        }
        
        List<Account> accountsList = [SELECT Id,No_of_Opps__c FROM Account WHERE Id IN : allAcocountIds];
        
        Map<Id,List<Opportunity>> accVsOppsMap = new Map<Id,List<Opportunity>>();
        List<Opportunity> opportunities = [SELECT Id,AccountId FROM Opportunity WHERE AccountId IN :allAcocountIds]; 
        if(!opportunities.isEmpty()){
            for(Opportunity currOpp: opportunities){
                if(accVsOppsMap.containsKey(currOpp.AccountId)){
                    accVsOppsMap.get(currOpp.AccountId).add(currOpp);
                }else{
                    accVsOppsMap.put(currOpp.AccountId, new List<Opportunity>());
                }                
            }
        }
        
        List<Account> listTobeUpdated = new List<Account>();
        if(!accountsList.isEmpty()){
            for(Account accRec : accountsList){             
                accRec.No_of_Opps__c = accVsOppsMap.get(accRec.Id).size();
                listTobeUpdated.add(accRec);
            }
        }
        
        if(listTobeUpdated.size()>0){
            try{
              update listTobeUpdated;  
            }catch(Exception e){
               System.debug('Error Message :' + e.getMessage()); 
            }
        }
  */
        
        //With two SOQL quaries(one is Aggeregate query), Map andsingle for loop
         Set<Id> allAcocountIds = new Set<Id>();
          for(Opportunity oppRec : Trigger.New){
            if(OppRec.AccountId != null){
                allAcocountIds.add(OppRec.AccountId);
            }
        }
        
        List<Account> accountsList = [SELECT Id,No_of_Opps__c FROM Account WHERE Id IN : allAcocountIds];
        
        Map<Id,Decimal> accVsOppsMap = new Map<Id,Decimal>();
        List<AggregateResult> oppsList = [SELECT Count(Id)totalOpps, AccountId 
                                           FROM Opportunity WHERE AccountId IN :allAcocountIds 
                                           GROUP BY AccountId];
        if(!oppsList.isEmpty()){
            for(AggregateResult ag: oppsList){
                Id accId = (Id) ag.get('AccountId');
                Decimal opps = (Decimal) ag.get('totalOpps');
                accVsOppsMap.put(accId,opps);
            }
        }
        
        List<Account> listToBeUpdated = new List<Account>();
        if(!accountsList.isEmpty()){
            for(Account accRec : accountsList){
                if(accVsOppsMap.containsKey(accRec.Id)){
                    accRec.No_of_Opps__c = accVsOppsMap.get(accRec.Id);
                    listToBeUpdated.add(accRec);
                }
            }
        }
        
        if(listToBeUpdated.size()>0){
            try{
                update listToBeUpdated;
            }catch(Exception e){
                System.debug('Error Message :' + e.getMessage());
            }
        }
    }
    
    if(Trigger.isAfter && Trigger.isUpdate){
        Set<Id> allAccountIds = new Set<Id>();
        for(Opportunity currOpp : Trigger.New){
            if(currOpp.AccountId != Trigger.OldMap.get(currOpp.Id).AccountId && currOpp.AccountId != null){
                Opportunity oldOpp = Trigger.OldMap.get(currOpp.Id);
                allAccountIds.add(currOpp.AccountId);
                allAccountIds.add(oldOpp.AccountId);
            }
        }
        
        List<Account> listTobeUpdated = new List<Account>();
  
         if(!allAccountIds.isEmpty()){
          for(Account accRec : [SELECT Id,No_of_Opps__c, 
                                 (SELECT Id,AccountId FROM Opportunities) 
                                  FROM Account WHERE Id IN :allAccountIds] ){
             accRec.No_of_Opps__c = accRec.Opportunities.size(); 
             listTobeUpdated.add(accRec);           
             }
         }
         
        if(listTobeUpdated.size()>0){
            try{
              update listTobeUpdated;  
            }catch(Exception e){
              System.debug('Error :' + e.getMessage());  
            }
        }
   }
    
    if(Trigger.isAfter && Trigger.isDelete){
         Set<Id> allAcocountIds = new Set<Id>();
          for(Opportunity oppRec : Trigger.Old){
            if(OppRec.AccountId != null){
                allAcocountIds.add(OppRec.AccountId);
            }
        }
        
          List<Account> listTobeUpdated = new List<Account>();
  
         if(!allAcocountIds.isEmpty()){
           for(Account accRec : [SELECT Id,No_of_Opps__c,  
                                 (SELECT Id,AccountId FROM Opportunities) 
                                  FROM Account WHERE Id IN :allAcocountIds] ){
               accRec.No_of_Opps__c = accRec.Opportunities.size(); 
               listTobeUpdated.add(accRec);           
             }
         }
         
        if(listTobeUpdated.size()>0){
            try{
              update listTobeUpdated;  
            }catch(Exception e){
              System.debug('Error :' + e.getMessage());  
            }
        }
    }
}