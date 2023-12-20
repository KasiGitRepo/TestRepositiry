trigger AvoidRecursion on Account (before insert) {

    /*
    if(RecursionHandler.flag){
        System.debug('No of records processed :' + Trigger.New.Size());
        RecursionHandler.flag=false;
    }else{
        System.debug('Records are skipped from the trigger due to recursion');
        System.debug('No of records are skipped from the trigger:' + Trigger.New.Size());
    }
*/
    if(Trigger.IsBefore && Trigger.IsInsert){
      RecursionHandler.recursionAvoid(Trigger.New);  
       System.debug('No of records processed :' + Trigger.New.Size());
    }
}