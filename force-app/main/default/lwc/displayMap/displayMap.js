/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 11-26-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement, api } from 'lwc';

export default class DisplayMap extends LightningElement {

    //Public propertird receive data from Screen Flow
    @api city;
    @api country;
    @api street;
    @api postalCode;
    @api state;
    @api title;
    @api value;
    @api description;

    //Getter method to get the data from the Screen flow
    get mapMarkers() {
        return [
            {
                location: {
                    City: this.city,
                    Country: this.country,
                    PostalCode: this.postalCode,
                    State: this.state,
                    Street: this.street,
                },
                value: this.value,
                title: this.title,
                description:
                    this.description, //escape the apostrophe in the string using &#39;
                icon: 'custom:custom14',
            },
        ];
    }

    //Getter method to check the data passed or not to the component
    get isLoadingMap() {
        if (this.street && this.state && this.postalCode && this.country && this.city) {
            return true;
        } else {
            return false;
        }
    }
}

