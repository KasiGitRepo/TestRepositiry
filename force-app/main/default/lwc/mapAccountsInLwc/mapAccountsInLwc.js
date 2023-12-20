/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-25-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/MapControllerLWC.getAccounts'
export default class MapAccountsInLwc extends LightningElement {
    //Create a property
    mapMarkers = []
    markerTitle = 'Account Locations'
    selectedMarker
    @wire(getAccounts)
    handleAccounts({ data, error }) {
        if (data) {
           // console.log(data)
            //Create a method to format the data in the form of Map
            this.formatResponse(data)
        }
        if (error) {
            console.error(error)
        }
    }

    formatResponse(data) {
          //Iterate the data with map and assign it to the mapMarkers
        this.mapMarkers = data.map(item => {
            return {
                //Attributes
                location: {
                    //If no field value, it will return empty, if you don't specify '', it will considered as undefined or null
                    Street: item.BillingCity || '',
                    State: item.BillingState || '',
                    Country: item.BillingCountry || '',
                    PostalCode: item.BillingPostalCode || '',
                    City: item.BillingCity || ''
                },
                icon: 'utility:salesforce1', //Icon
                title: item.Name,            // Name when you click on icon
                value: item.Name,            // Value of the icon
                description: item.Description //Description from field
            }
        })
        //To select the marker by default
       this.selectedMarker = this.mapMarkers.length && this.mapMarkers[0].value
    }

    markerHandler(event){
      this.selectedMarker = event.detail.selectedMarkerValue
    }
}