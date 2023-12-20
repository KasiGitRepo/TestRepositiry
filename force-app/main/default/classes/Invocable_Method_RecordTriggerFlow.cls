public class Invocable_Method_RecordTriggerFlow {

     @InvocableMethod(label='Update description with field values' description='Update the description with other field values')
     public static List<String> updateDescriptionwithName(List<String> names){
        
          List<String> oppNames =new List<String>();         
          for(Opportunity opp : [SELECT Id,Name from Opportunity WHERE Id IN:names]){
             oppNames.add(opp.Name);
         }
           return oppNames;
    }
}