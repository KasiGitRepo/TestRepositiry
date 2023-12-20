trigger TotalOppAmountonAcc_Rollup on Opportunity (after insert,after update,after delete,after undelete) {
    
    if(Trigger.isAfter && ( Trigger.isInsert || Trigger.isUnDelete)){
        
     Set<Id> allAccountIds = new Set<Id>();

for (Opportunity currOpp : Trigger.New) {
    if (currOpp.AccountId != null) {
        allAccountIds.add(currOpp.AccountId);
    }
}

List<Account> accList = [SELECT Id, Total_Amount_on_Opportunity__c FROM Account WHERE Id IN :allAccountIds];

List<Opportunity> oppList = [SELECT Id, AccountId, Amount FROM Opportunity WHERE AccountId IN :allAccountIds];
Map<Id, List<Opportunity>> oppToAccMap = new Map<Id, List<Opportunity>>();

if (!oppList.isEmpty()) {
    for (Opportunity opp : oppList) {
        if (oppToAccMap.containsKey(opp.AccountId)) {
            oppToAccMap.get(opp.AccountId).add(opp);
        } else {
            oppToAccMap.put(opp.AccountId, new List<Opportunity>{ opp });
        }
    }
}

List<Account> listToUpdate = new List<Account>();

if (!accList.isEmpty()) {
    for (Account acc : accList) {
        Decimal totalAmount = 0;
        if (oppToAccMap.containsKey(acc.Id)) {
            for (Opportunity opp : oppToAccMap.get(acc.Id)) {
                totalAmount += opp.Amount; // Accumulate the total Amount for each Account
            }
            acc.Total_Amount_on_Opportunity__c = totalAmount;
            listToUpdate.add(acc);
        }
    }
}

update listToUpdate;
  
        /*
        Map<Id,Opportunity> accToOppMap = new Map<Id,Opportunity>();
        for(Opportunity opp : Trigger.New){
            if(accToOppMap.containsKey(opp.AccountId)){
                accToOppMap.get(opp.AccountId).add(opp.Amount);
            }else{
                accToOppMap.put(opp.AccountId, opp);
            }
        }
        */
   /*
    Set<Id> allAccountIds = new Set<Id>();
     for(Opportunity currOpp:Trigger.New){
        if(currOpp.AccountId != null){
            allAccountIds.add(currOpp.AccountId);
        }
    }
    
   List<AggregateResult> results = [SELECT AccountId, Sum(Amount)totalAmount, Count(Id) FROM Opportunity 
                                    WHERE AccountId IN :allAccountIds GROUP BY AccountId ];
    Map<Id,Decimal> oppToaccMap = new Map<Id,Decimal>();
     if(!results.isEmpty()){
        for(AggregateResult ar:results){
            Id accId = (Id) ar.get('AccountId');
            Decimal totalAmount = (Decimal) ar.get('totalAmount');
          oppToaccMap.put(accId, totalAmount); 
        }         
    }
    List<Account> listToUpdate = new List<Account>();
        for(Id currAcc: allAccountIds){
            Decimal totalAmount = oppToaccMap.get(currAcc);
            Account acc = new Account(Id = currAcc, Total_Amount_on_Opportunity__c = totalAmount);
            listToUpdate.add(acc);
      }
    
    if(listToUpdate.size()>0){
        try{
            update listToUpdate;
        }Catch(Exception e){
            System.debug('Error Message :'+e.getMessage());
        }
      }
  */
    }
    
    if(Trigger.isAfter && Trigger.isUpdate){
        
     Set<Id> allAccountIds = new Set<Id>();
     for(Opportunity currOpp:Trigger.New){
         if(currOpp.AccountId != Trigger.OldMap.get(currOpp.Id).AccountId && currOpp.AccountId != null){
             Opportunity oldOpp = Trigger.OldMap.get(currOpp.Id);
            allAccountIds.add(currOpp.AccountId);
            allAccountIds.add(oldOpp.AccountId);
        }
    }
    
   List<AggregateResult> results = [SELECT AccountId, Sum(Amount)totalAmount, Count(Id) FROM Opportunity 
                                    WHERE AccountId IN :allAccountIds GROUP BY AccountId ];
    Map<Id,Decimal> oppToaccMap = new Map<Id,Decimal>();
     if(!results.isEmpty()){
        for(AggregateResult ar:results){
            Id accId = (Id) ar.get('AccountId');
            Decimal totalAmount = (Decimal) ar.get('totalAmount');
          oppToaccMap.put(accId, totalAmount); 
        }         
    }
    List<Account> listToUpdate = new List<Account>();
        for(Id currAcc: allAccountIds){
            Decimal totalAmount = oppToaccMap.get(currAcc);
            Account acc = new Account(Id = currAcc, Total_Amount_on_Opportunity__c = totalAmount);
            listToUpdate.add(acc);
      }
    
    if(listToUpdate.size()>0){
        try{
            update listToUpdate;
        }Catch(Exception e){
            System.debug('Error Message :'+e.getMessage());
        }
    }
    }
    
    if(Trigger.isAfter && Trigger.isDelete){
          
        Set<Id> allAccountIds = new Set<Id>();
          for(Opportunity currOpp:Trigger.Old){
            if(currOpp.AccountId != null){
             allAccountIds.add(currOpp.AccountId);
        }
    }
    
   List<AggregateResult> results = [SELECT AccountId, Sum(Amount)totalAmount, Count(Id) FROM Opportunity 
                                    WHERE AccountId IN :allAccountIds GROUP BY AccountId ];
    Map<Id,Decimal> oppToaccMap = new Map<Id,Decimal>();
     if(!results.isEmpty()){
        for(AggregateResult ar:results){
            Id accId = (Id) ar.get('AccountId');
            Decimal totalAmount = (Decimal) ar.get('totalAmount');
          oppToaccMap.put(accId, totalAmount); 
        }         
    }
    List<Account> listToUpdate = new List<Account>();
        for(Id currAcc: allAccountIds){
            Decimal totalAmount = oppToaccMap.get(currAcc);
            Account acc = new Account(Id = currAcc, Total_Amount_on_Opportunity__c = totalAmount);
            listToUpdate.add(acc);
      }
    
    if(listToUpdate.size()>0){
        try{
            update listToUpdate;
        }Catch(Exception e){
            System.debug('Error Message :'+e.getMessage());
        }
      }
    }
    
  }