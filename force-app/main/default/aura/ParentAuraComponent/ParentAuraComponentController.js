/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 12-13-2023
 * @last modified by  : Kasi Jangiti
**/
({
    handleClick: function (component, event, helper) {
        //Find the LWC method with help of aura:id
        component.find("childLWC").getDataFromAura('Welcome to Tech Journey With Ankit');
    }
})
