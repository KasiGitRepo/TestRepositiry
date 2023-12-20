import { LightningElement } from 'lwc';

export default class LwcLoops extends LightningElement {

    companies = ["Salesforce", "TCS", "Google", "Amazon", "Tesla"];

    contactList = [
        {
            id: 1,
            firstName: 'Ratan',
            lastName: 'Tata',
            company: 'TATA'
        },
        {
            id: 2,
            firstName: 'Sundar',
            lastName: 'Pichai',
            company: 'Google'
        },
        {
            id: 3,
            firstName: 'Sudha',
            lastName: 'Murthy',
            company: ' Infosys'
        }
    ];
}