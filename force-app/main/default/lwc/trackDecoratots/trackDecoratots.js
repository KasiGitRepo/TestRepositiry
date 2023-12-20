/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 10-07-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement, track } from 'lwc';

export default class TrackDecoratots extends LightningElement {
  /*
    @api firstName
    @api lastName
  
     handleInput(event){
       const field = event.target.name 
        if(field === 'firstName'){
           this.firstName = event.target.value 
        }else if(field === 'lastName'){
          this.lastName = event.target.value
        }
     }
        get getName(){
          return `${this.firstName} ${this.lastName}`. toUpperCase()
        }
        */
  // Reactive nested object non primitive Private properties with track decorator   
  /*
    @track myName = { fname: 'Kasi', lname: 'Jangiti' };
    @track myData = [30, 'Guntur', 'Andhra Pradesh'];
  
    changeHandler(event) {
      this.myName.fname = 'Raj';
      this.myName.lname = 'Kumar';
      this.myData.push('Piduguralla');
    }
    */

  //Without track decorator
  myName = { fname: 'Kasi', lname: 'Jangiti', age: '' };
  myData = [30, 'Guntur', 'Andhra Pradesh'];

  changeHandler(event) {
    //Assigning the values 
    this.myName = { fname: 'Abdul Kalam', lname: 'Missle Man' };

    //By spread operator
    this.myData = [...this.myData, 'Chennayapalem']
  }
}