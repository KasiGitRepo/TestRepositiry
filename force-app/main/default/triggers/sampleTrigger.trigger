trigger sampleTrigger on Account (before insert) {

     //Convert the Trigger.New/List<sObject> into String using JSON.serialize method
     String accData = JSON.serialize(Trigger.New);
    
    //Call the future method from handler class and passing string as a parameter
     sampleClass.executeFuture(accData);
}