/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-16-2023
 * @last modified by  : Kasi Jangiti
**/
({
    doinit : function(component, event, helper) {

         var page = component.get("v.pageReference")
         var id = page.state.c__id
         component.set("v.recordid", id)
    }
})
