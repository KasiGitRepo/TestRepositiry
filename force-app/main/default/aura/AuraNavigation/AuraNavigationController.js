/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-16-2023
 * @last modified by  : Kasi Jangiti
**/
({
    doInit : function(component) {
       var myRef = component.get("v.pageReference")
       var id = myRef.state.c__id
       component.set("v.id",id)
    }
})
