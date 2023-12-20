trigger OLItoAccountRollup on OpportunityLineItem (after insert) {

  //Intermediate way (Nested for loop)
  /*
    //Add all OpportunityId's to Set
    Set<Id> allOppIds = new Set<Id>();
    for(OpportunityLineItem currOLI : Trigger.New){
        if(currOLI.OpportunityId != null){
            allOppIds.add(currOLI.OpportunityId);
        }
    }

    //Fetch list of Opps and AccountId based on OpportunityId present in OLI 
    List<Opportunity> oppsList = [SELECT Id,AccountId FROM Opportunity WHERE Id IN : allOppIds];
    Map<Id,List<Opportunity>> oppToaccMap = new Map<Id,List<Opportunity>>();
    if(!oppsList.isEmpty()){
         for(Opportunity currOpp:oppsList){
            // If accountId exist, add all opps to that accountId
            if(oppToaccMap.containsKey(currOpp.AccountId)){
               oppToaccMap.get(currOpp.AccountId).add(currOpp); 
            }else{
                oppToaccMap.put(currOpp.AccountId, new List<Opportunity>{currOpp}); 
            }
        } 
    } 
    List<OpportunityLineItem> listOfOLIs = [SELECT Id,OpportunityId FROM OpportunityLineItem 
                                            WHERE OpportunityId IN : allOppIds];
    Map<Id,List<OpportunityLineItem>> oliToOppMap = new Map<Id,List<OpportunityLineItem>>();
    
    if(!listOfOLIs.isEmpty()){
        for(OpportunityLineItem currOLI : listOfOLIs){
            if(oliToOppMap.containsKey(currOLI.OpportunityId)){
                oliToOppMap.get(currOLI.OpportunityId).add(currOLI);
            }else{
                oliToOppMap.put(currOLI.OpportunityId, new List<OpportunityLineItem>{currOLI}) ;
            }
        }
    }
    
    List<Account> listTobeUpdated = new List<Account>();
    if(oppToaccMap.size()>0){
        //Iterate AccountIds from the Map
        for(Id AccountId : oppToaccMap.keySet()){
            Account currAcc = new Account(Id = AccountId);
            Integer count =0;
          //Iterate the List<Opps> from Map
            for(Opportunity currOpp : oppToaccMap.get(AccountId)){
                count = count + oliToOppMap.get(currOpp.Id).size();
            } 
           currAcc.No_of_OLIs__c = count; 
            listTobeUpdated.add(currAcc);
        }
        
        if(listTobeUpdated.size()>0){
            try{
                update listTobeUpdated;
            }catch(Exception e){
                System.debug('Error Message :' + e.getMessage());
            }
        }
    }
  */
    
  //Smart way with two quaries (one is Aggeregate Query) 
    Set<Id> allOppIds = new Set<Id>();
      for(OpportunityLineItem currOLI : Trigger.New){
        if(currOLI.OpportunityId != null){
          allOppIds.add(currOLI.OpportunityId);  
        }
    }
    
    Map<Id,Id> oppToaccMap = new Map<Id,Id>();
    List<Opportunity> oppRecords = [SELECT Id,AccountId FROM Opportunity WHERE Id IN :allOppIds ];
      if(!oppRecords.isEmpty()){
          for(Opportunity opp:oppRecords){
              oppToaccMap.put(opp.Id, opp.AccountId);
          }
     }  
    // AccountId as key and OLI's as value
    Map<Id,Integer> oliToaccMap = new Map<Id,Integer>();
    List<AggregateResult> oliList = [SELECT Opportunity.AccountId, Count(Id)oliCount FROM OpportunityLineItem 
                                      WHERE OpportunityId IN : allOppIds 
                                        GROUP BY Opportunity.AccountId ];
    if(!oliList.isEmpty()){
        for(AggregateResult currAR:oliList){
            Id accId = (Id) currAR.get('AccountId');
            Integer count = (Integer) currAR.get('oliCount');
            oliToaccMap.put(accId, count);
          //  oliToaccMap.put( (Id)currAR.get('AccountId'), (Integer)currAR.get('oliCount'));
        }
    }
    
    List<Account> listTobeUpdated = new List<Account>();
    for(Id oppId : allOppIds){
        Id accountId = oppToaccMap.get(oppId);
        Integer count = oliToaccMap.get(accountId);
        
        Account currAcc = new Account(Id = accountId, No_of_OLIs__c = count);
        listTobeUpdated.add(currAcc);
    }
    
    if(listTobeUpdated.size()>0){
        try{
            update listTobeUpdated;
        }catch(Exception e){
            System.debug('Error Occured :' + e.getMessage());
        }
    }

    
  /*
   Set<Id> allAccountIds = new Set<Id>();
    for(OpportunityLineItem currOLI:Trigger.New){
        if(currOLI.OpportunityId != null ){
            System.debug('AccountId :' + currOLI.Opportunity.AccountId);
          if(currOLI.Opportunity.AccountId != null){
             allAccountIds.add(currOLI.Opportunity.AccountId);
          }    
       }
    }
    System.debug('Account Ids :' + allAccountIds);
    
    List<AggregateResult> oliList = [SELECT Opportunity.AccountId, Count(Id)totalOLIs 
                                     FROM OpportunityLineItem WHERE Opportunity.AccountId IN : allAccountIds 
                                      GROUP BY Opportunity.AccountId];
    System.debug('oliList :' + oliList);
    Map<Id,Integer> oliToaccMap = new Map<Id,Integer>();
    if(!oliList.isEmpty()){
        for(AggregateResult ar:oliList){
            Id accId = (Id) ar.get('AccountId');
            Integer count = (Integer) ar.get('totalOLIs');
            oliToaccMap.put(accId,count);
        }
    }
    
    List<Account> listToUpdated = new List<Account>();
    for(Id accountId : allAccountIds){
        Integer count = oliToaccMap.get(accountId);
        Account currAcc = new Account(Id = accountId, No_of_OLIs__c = count);
        listToUpdated.add(currAcc);
    }
      SYstem.debug('listToUpdated :' + listToUpdated); 
    if(listToUpdated.size()>0){
        try{
           update listToUpdated; 
        }catch(Exception e){
          System.debug('Error Message :' + e.getMessage());  
        }
    }
*/
 }