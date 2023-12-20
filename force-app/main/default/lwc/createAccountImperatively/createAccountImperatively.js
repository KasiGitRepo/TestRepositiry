/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-25-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
import createAccountandOpportunity from '@salesforce/apex/OpportunityController.createAccountandOpportunity'
export default class CreateAccountImperatively extends LightningElement {

    accName
    accAnnRevenue
    accRating
    accIndustry

    createHandler() {
        createAccountandOpportunity({
            name:this.accName,
            rating:this.accRating,
            annualRevenue:this.accAnnRevenue,
            industry:this.accIndustry
        }).then(result => {          
            alert(JSON.stringify(result))
            console.log(JSON.stringify(result))
            this.showToast('Success!!', `Record createde successfully ${result.Id}`)
        }).catch(error => {
            this.showToast('Error!!', error.body.message, 'error')
            alert(JSON.stringify(error))
        })
    }

    handleName(event){
        this.accName = event.target.value  
    }

    handleRevenue(event){
        this.accAnnRevenue = event.target.value
    }

    handleRating(event){
        this.accRating = event.target.value
    }

    handleIndustry(event){
        this.accIndustry = event.target.value
    }


    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({
            title,
            message,
            variant: variant || 'success'
        }))
    }
}