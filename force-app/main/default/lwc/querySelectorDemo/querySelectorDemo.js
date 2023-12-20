/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-03-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement } from 'lwc';

export default class QuerySelectorDemo extends LightningElement {

    cities=["Guntur","Chennai", "Vizag", "Bangalore", "Hyderabad", "Tirupathi", "Nellore"]

    fetchHandler(){

        //Query single element from html
        const elem = this.template.querySelector('h1')
        console.log(elem)
        
        //Querying multiple elements from html element
        const elemList = this.template.querySelectorAll('.name')
        
        //Convert Node.js into an array
        Array.from(elemList).forEach(item=>{
            console.log(item.innerText)
            this.setAttribute("title", item.innerText)
        })
    }
}