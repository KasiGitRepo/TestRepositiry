/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-25-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement, wire } from 'lwc';
import fetchAccountsByIndustry from '@salesforce/apex/apexLWCAccountController.fetchAccountsByIndustry'
export default class ApexLWCWithParam extends LightningElement {

    selectedIndustry=''
    @wire(fetchAccountsByIndustry, {industri:'$selectedIndustry'})
    accountIndustry

    get industryOptions(){
        return [
            { label:'Agriculture', value:'Agriculture'},
            { label:'Banking', value:'Banking'},
            { label:'Energy', value:'Energy'},
            { label:'Communications', value:'Communications'},
            { label:'Biotechnology', value:'Biotechnology'},
            { label:'Education', value:'Education'},
            { label:'Chemicals', value:'Chemicals'}
        ]
    }

    handleIndustry(event){
        this.selectedIndustry = event.target.value
    }
}