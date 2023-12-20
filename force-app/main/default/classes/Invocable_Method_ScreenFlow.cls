public class Invocable_Method_ScreenFlow {
    
    @InvocableMethod(label='Get highest amount record' description='This method will fetch the highest amount of opportunity record for account')
    public static List<Opportunity> getHighestAmountRecord(List<String> args){
        String accountId = args[0];
        
        List<Opportunity> oppsList = [SELECT Id,Name,Amount,StageName,CloseDate from Opportunity WHERE AccountId =: accountId order by Amount DESC LIMIT 1];
        return oppsList;
    }
 
}