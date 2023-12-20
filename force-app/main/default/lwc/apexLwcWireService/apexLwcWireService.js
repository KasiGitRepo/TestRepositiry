/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-24-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement, wire } from 'lwc';
import getAccountList from '@salesforce/apex/apexLWCAccountController.getAccountList'

export default class ApexLwcWireService extends LightningElement {

    //Wire as property
    accountRecords=[]
    @wire(getAccountList)
    accounts

    //Wire as function
    @wire(getAccountList)
    accountsHandler({data,error}){
        if(data){
            console.log(data)
            this.accountRecords = data.map(item=>{
              let newType = item.Type === 'Customer - Channel'? 'Channel':
              item.Type === 'Customer - Direct'? 'Direct':'----------'
              return {...item, newType}
            })
        }
        if(error){
            console.error(error)
        }
    }
}