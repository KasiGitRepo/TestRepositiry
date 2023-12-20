/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-01-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement, track } from 'lwc';

export default class HelloIndia extends LightningElement {

    fullname = "Salesforce Lovers"
    designation="Salesforce Developer"

  changeHandler(event){
     this.fullname = event.target.value
   }

  changeDesi(event) {
    this.designation = event.target.value
  }

  address = {
    city: "Guntur",
    state: "Andhra Pradesh"
  }

  changeHandler(event) {
    // this.address.city = event.target.value
    this.address = { ...this.address, "city": event.target.value }
  }

  changeDesi(event) {
    // this.address.state = event.target.value
    this.address = { ...this.address, "state": event.target.value }
  }


  cities = ["Piduguralla", "Hyderabad", "Guntur", "Vizag"]

  get firstCity() {
    return this.cities[0]
  }

  num1 = 163.64798
  num2 = 143.0136698
  get Division() {
    return this.num1 * this.num2
  }
 }