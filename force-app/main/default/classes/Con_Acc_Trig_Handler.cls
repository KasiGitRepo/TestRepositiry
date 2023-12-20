public class Con_Acc_Trig_Handler {

    public static void associateTasks(List<Contact> conList){
      Set<Id> accIds = new Set<Id>();
        for(Contact con : conList){
            if(con.AccountId != null)
                accIds.add(con.AccountId);
        }
        Map<Id,Account> accMap = new Map<Id,Account>();
        List<Account> accList = [SELECT Id,Name,No_of_Contacts__c, (SELECT Id from Contacts) 
                                  FROM Account WHERE Id IN : accIds]; 
         
        for(Account acc : accList){
            accMap.put(acc.Id, acc);
       
        }
    }
}