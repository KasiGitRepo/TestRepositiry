/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-25-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement, wire } from 'lwc';
import getContacts from '@salesforce/apex/MapControllerLWC.getContacts'
export default class MapsContactsInLwc extends LightningElement {

    mapMarkers = []
    selectedMarker
    @wire(getContacts)
    contactsHandler({ data, error }) {
        if (data) {
            console.log(data)
            this.formatResponse(data)
        }
        if (error) {
            console.error(error)
        }
    }

    formatResponse(data){
        this.mapMarkers = data.map(item=>{
            return {
                location:{
                   Street : item.MailingCity || '',
                   City : item.MailingCity || '',
                   State: item.MailingState || '',
                   Country:item.MailingCountry || '',
                   PostalCode : item.MailingPostalCode || ''
                },
                icon:'utility:salesforce1',
                title:item.Name,
                value:item.Name,
                description:item.Description
            }
        })
        this.selectedMarker = this.mapMarkers.length && this.mapMarkers[0].value
    }

    contactSelectHandler(event){
        this.selectedMarker = event.detail.selectedMarkerValue
    }
}