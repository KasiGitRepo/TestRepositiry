/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-22-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement, wire } from 'lwc';
import { getNavItems } from 'lightning/uiAppsApi'
export default class GetNavItemsByWire extends LightningElement {

result

    @wire( getNavItems, { 
        navItems:['standard-Account'] ,
        pageSize:40
    })
    navitemsHandler({data}){
       if(data){
        console.log(data)
        this.result = data.navItems[0]
       }
    }
}