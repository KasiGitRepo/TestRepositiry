public class Example {

    public static void createNoOfContacts(List<Account> accList){
        List<Contact> conList = new List<Contact>();
        for(Account acc:accList){
            if(acc.No_of_Contacts__c != null){
                for(Integer i=1; i<=acc.No_of_Contacts__c; i++){
                    Contact con = new Contact();
                    con.LastName = 'Contact '+i;
                    con.AccountId = acc.Id;
                    conList.add(con);
                }
            }
        }
        if(!conList.isEmpty()){
            Database.Insert(conList,false);
        }
    }
}