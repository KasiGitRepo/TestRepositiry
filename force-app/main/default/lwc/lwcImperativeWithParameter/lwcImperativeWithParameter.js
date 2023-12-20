/**
 * @description       : Get Opportunity Records by passing Input Text 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-25-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement } from 'lwc';
import fetchOpportunities from '@salesforce/apex/OpportunityController.fetchOpportunities'
export default class LwcImperativeWithParameter extends LightningElement {

    searchKey
    opps
    searchHandler(event) {
        window.clearTimeout(this.timer)
        this.searchKey = event.target.value
    }

    //De-bouncing technique
    callApexMethod() {
        fetchOpportunities({
            searchText: this.searchKey
        }).then(result => {
            this.opps = result
        }).catch(error => {
            console.error(error)
            alert(JSON.stringify(error))
        })
    }

    handleOpps() {
        this.timer = setTimeout(() => {
            this.callApexMethod()
        }, 1000)
    }
}