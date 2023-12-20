public class AccountTriggerHandler {
    
    public static void updateChildContacts(List<Account> accounts, Map<Id,Account> oldMap){
          Map<Id,String> accMap = new Map<Id,String>();
        if(!accounts.isEmpty()){          
            for(Account acc : accounts){
                if(OldMap.get(acc.Id).Phone != acc.Phone && acc.Phone != null ){                   
                    accMap.put(acc.Id, acc.Phone);
                }
            }
      }
        
         List<Contact> contacts = [SELECT Id,AccountId,Phone FROM Contact WHERE AccountId IN:accMap.keySet()];
    
        List<Contact> listToUpdate = new List<Contact>();
        if(!contacts.isEmpty()){
            for(Contact con:contacts){
                if(accMap.containsKey(con.AccountId)){
                    con.Phone = accMap.get(Con.AccountId);
                    listToUpdate.add(con);
                }
            }
        }
        
        if(listToUpdate.size()>0){
            try{
                update listToUpdate;
                System.debug('All contacts updated successfully');
            }Catch(Exception e){
                System.debug('Error Occured :' + e.getMessage());
            }
        }
    }
  }