/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 11-27-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement } from 'lwc';

export default class ConvertedCurrency extends LightningElement {

    //Define properties
    showOutput = false;
    enteredAmount = "";
    fromCurrency = "";
    toCurrency = "";
    convertedValue = "";
    currencyoptions = [];

    //Get the data from Input field and comboxes
    changeHandler(event) {
        let { name, value } = event.target;
        if (name === 'amount') this.enteredAmount = value;
        if (name === 'fromCurr') this.fromCurrency = value;
        if (name === 'toCurr') this.toCurrency = value;
    }

    //On load of the component fetch the currencies from API
    connectedCallback() {
        this.fetchSymbols();
    }

    //Call method in Asynchronously(Fetching the data will be in Async)
    async fetchSymbols() {
        //from the endpoint url
        let endpoint = 'https://api.frankfurter.app/currencies';
        try {
            //Fetch the data/currencies from API
            let response = await fetch(endpoint);
            //Check if response is not ok
            if (!response.ok) {
                //Throw error message
                throw new Error('Network Response Issue');
            }
            //Convert/store the response in JSON format
            const data = await response.json();


            //Process the data returned from API
            let options = [];
            for (let symbol in data) {
                //Assign the options from the data
                options = [...options, { label: symbol, value: symbol }];
            }

            //Assign options/currencies to currencyoptions
            this.currencyoptions = [...options];
        } catch (error) {
            console.log('error', error);
        }
    }

    clickHandler(event) {
        this.conversion();
    }

    //Call mehtod in Asynchronously to convert the currencies
    async conversion() {
        //fromthe endpoint url
        let endpoint = `https://api.frankfurter.app/latest?amount=${this.enteredAmount}&from=${this.fromCurrency}&to=${this.toCurrency}`
        try {
            //Do the conversion in the API from and store the value in response 
            let response = await fetch(endpoint);

            //If response not ok, throw an error message
            if (!response.ok) {
                throw new Error('Network Response Issue');
            }

            //Convert/Store the value in JSON format
            const data = await response.json();
            //Process the data returned from API

            //Assign the converted value to property
            this.convertedValue = data.rates[this.toCurrency];

            //Set the flag as true to display converted amount on UI
            this.showOutput = true;

        } catch (error) {
            console.log('error', error);
        }
    }

}