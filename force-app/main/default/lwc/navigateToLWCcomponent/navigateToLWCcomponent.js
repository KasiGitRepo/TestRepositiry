/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-16-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation'
export default class NavigateToLWCcomponent extends NavigationMixin(LightningElement) {

    handleLWCcomponent(){
        //defination is an object, it can store lwc component and attributes
        var defination={
            //we pass the lwc component through componentDef
            componentDef:'c:navigateToLWCTarget',
            attributes:{
                recordId:'23535235845782354'
            }
        }
          
          this[NavigationMixin.Navigate]({
               type:'standard__webPage',
               attributes:{
                //btoa is a method to navigate to the lwc component
                //(JSON.stringify(defination))=> converts object into string
                url:'/one/one.app#'+btoa(JSON.stringify(defination))
               }
          })
    }
}