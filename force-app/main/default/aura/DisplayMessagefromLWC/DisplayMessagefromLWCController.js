/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 12-14-2023
 * @last modified by  : Kasi Jangiti
**/
({
    handleName: function (component, event, helper) {
        //Receive the data from Child event with the help of "getParam(parameter)" method
        let fullName = event.getParam("fullName");
        alert(fullName);
    }
})
