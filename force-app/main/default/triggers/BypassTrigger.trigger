trigger BypassTrigger on Account (before insert) {

    By_Pass_Elements__c  elements = By_Pass_Elements__c.getInstance(UserInfo.getProfileId());
    if(elements.Bypass_Automations__c){
        System.debug('Trigger is bypassed');
    }
}