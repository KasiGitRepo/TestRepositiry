/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-03-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement } from 'lwc';

export default class Looping extends LightningElement {

    vegetables = ["Tomato", "Carrot", "Brinjal", "Mirchi", "Cucumber", "Capsicum"]

    companies=[
        {
            id:1,
            name:"Nucon",
            city:"Hyderabad"
        },
        {
            id:2,
            name:"Tata",
            city:"Bangalore"
        },
        {
            id:3,
            name:"Kirbi",
            city:"Vijayawada"
        },
        {
            id:4,
            name:"Skyroot",
            city:"Vizag"
        }
    ]
}