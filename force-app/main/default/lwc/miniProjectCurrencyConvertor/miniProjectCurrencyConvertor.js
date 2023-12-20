/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 11-27-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement } from 'lwc';

export default class MiniProjectCurrencyConvertor extends LightningElement {

    displayOutput = false;
    convertedAmount = "";
    toCurrency = "";
    currencyOptions = [];
    enteredAmount = "";
    fromCurrency = "";

    connectedCallback() {
        this.fetchSymbols();
    }

    changeHandler(event) {
        let { name, value } = event.target;
        if (name === 'amount') this.enteredAmount = value;
        if (name === 'fromCurr') this.fromCurrency = value;
        if (name === 'toCurr') this.toCurrency = value;
    }

    async fetchSymbols() {
        let endpoint = 'https://api.frankfurter.app/currencies';
        console.log('API ENdpoint URL', endpoint);
        try {
            let response = await fetch(endpoint);
            if (!response.ok) {
                throw new Error('Network Access is not Ok');
            }
            const data = await response.json();

            let options = [];
            for (let symbol in data) {
                options = [...options, { label: symbol, value: symbol }];
            }
            this.currencyOptions = [...options];

        } catch (error) {
            console.log("Error while fetch the currencied from API", error);
        }
    }

    conversionHandler() {
        this.conversion();
    }
    async conversion() {
        let endpoint = `https://api.frankfurter.app/latest?amount=${this.enteredAmount}&from=${this.fromCurrency}&to=${this.toCurrency}`;
        try {
            let response = await fetch(endpoint);
            if (!response.ok) {
                throw new Error('Network connection is not Ok');
            }
            const data = await response.json();
            this.convertedAmount = data.rates[this.toCurrency];
            this.displayOutput = true;
        } catch (error) {
            console.log("Error occured WHile converting the currency", error);
        }
    }
}