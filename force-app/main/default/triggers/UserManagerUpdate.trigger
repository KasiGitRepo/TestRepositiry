trigger UserManagerUpdate on Opportunity (before insert, before update) {

    if(Trigger.isBefore && (Trigger.IsInsert || Trigger.isUpdate)){
        
      //Bad Practice
        /*
        for(Opportunity opp : Trigger.New){
            if(opp.OwnerId != null){
                User currentUser = [SELECT Id,ManagerId FROM User WHERE Id =: opp.OwnerId];
                opp.Owner_ManagerId__c = currentUser.ManagerId;
            }
        }
       */
        
     //Intermediatory
   /*
        Set<Id> allOwnerIds = new Set<Id>();
        for(Opportunity opp : Trigger.New){
            if(opp.OwnerId != null){
                allOwnerIds.add(opp.OwnerId);	
            }
        }  
        List<User> allAssociatedUsers = [SELECT Id,ManagerId FROM User WHERE Id IN : allOwnerIds];
        Map<Id,Id> userAndManagerIds = new Map<Id,Id>();
        if(!allAssociatedUsers.isEmpty()){
            for(User currentUser:allAssociatedUsers){
                userAndManagerIds.put(currentUser.Id, currentUser.ManagerId);
            }
        }
        
        for(Opportunity opp:Trigger.New){
            if(userAndManagerIds.containsKey(opp.OwnerId)){
                opp.Owner_ManagerId__c = userAndManagerIds.get(opp.OwnerId);
            } 
        }
   */
        
       //Perfect
        Set<Id> allOppOwnerIds = new Set<Id>();
        for(Opportunity currentOpp:Trigger.New){
            if(currentOpp.OwnerId != null){
                allOppOwnerIds.add(currentOpp.OwnerId);
            }
        }
        
        Map<Id,User> userToManagerMap = new Map<Id,User>();
        if(!allOppOwnerIds.isEmpty()){
           userToManagerMap = new Map<Id,User>([SELECT Id,ManagerId FROM User WHERE Id IN :allOppOwnerIds ]);
        }
   
        for(Opportunity currOpp : Trigger.New){
            if(userToManagerMap.size()>0){
                if(userToManagerMap.containsKey(currOpp.OwnerId)){
                    currOpp.Owner_ManagerId__c = userToManagerMap.get(currOpp.OwnerId).ManagerId;
                }
            }
        }
    }
}