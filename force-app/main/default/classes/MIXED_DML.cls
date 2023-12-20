public class MIXED_DML{

    public static void executes(){
       User u = [SELECT Id,IsActive FROM User Where Username = 'comuserpoorankitjains@gmail.com'];
       u.IsActive = false;
       update u;
       System.debug(u);
     List<Opportunity> opps = [SELECT Id,Name,AccountId FROM Opportunity WHERE AccountId = null];
      delete opps; 
    }
}