/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-14-2023
 * @last modified by  : Kasi Jangiti
**/
({
    handleData : function(component, event) {

        var msg = event.getParam("msg");
        console.log('Message from LWC:' + msg);
        component.set("v.messageInfo",msg);

    }
})
