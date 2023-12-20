/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-02-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement } from 'lwc';

export default class TemplateLooping extends LightningElement {

    states=["Andhra Pradesh", "Telangana", "Bihar", "Kerala", "Tamilnadu", "Maharastra"]

    citiesList=[
        {
            id:1,
            name:"Hyderabad",
            state:"Telangana"
            
        },
        {
            id:2,
            name:"Amaravathi",
            state:"Andhra Pradesh"
           
        },
        {
            id:3,
            name:"Chennai",
            state:"Tamilnadu"
            
        },
        {
            id:4,
            name:"Bangalore",
            state:"Karnataka"
            
        }
    ]
}