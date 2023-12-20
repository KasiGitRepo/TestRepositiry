/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-26-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement, wire } from 'lwc';
import getContactList from '@salesforce/apex/FilteronListOfRecords.getContactList'
export default class FilterContactRecords extends LightningElement {
    headings = ["Id", "Name", "Email", "Title"]
    fullDatainTable=[]
    filterData=[]
    @wire(getContactList)
    contactsHandler({data,error}){
        if(data){
            console.log(data)
            this.filterData=data
            this.fullDatainTable=data
        }
        if(error){
            console.log(error)
        }
    }

    filterHandler(event){
        const {value} = event.target
        console.log(value)
         if(value){
            this.filterData = this.fullDatainTable.filter(eachObj=>{
                return Object.keys(eachObj).some(key=>{
                    return eachObj[key].toLowerCase().includes(value)
                })
            })
         }else{
            this.filterData = [...this.fullDatainTable]
         }
       
    }
}