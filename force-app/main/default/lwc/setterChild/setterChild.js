/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-11-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement, api } from 'lwc';

export default class SetterChild extends LightningElement {
    
   userDetail

    @api    
    get detail(){
      return this.userDetail
    }

    //Setter method
    set detail(data){
      let newage = data.age*2
      this.userDetail = {...data, age:newage, "country":"INDIA"}
    }
}