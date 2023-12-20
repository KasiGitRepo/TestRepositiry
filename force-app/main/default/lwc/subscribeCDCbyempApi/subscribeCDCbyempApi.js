/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 12-05-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement, api } from 'lwc';
import {
    subscribe,
    unsubscribe,
    onError,
    setDebugFlag,
    isEmpEnabled,
} from 'lightning/empApi';
import { notifyRecordUpdateAvailable } from 'lightning/uiRecordApi';
export default class SubscribeCDCbyempApi extends LightningElement {
    isShowAlert = false;
    @api channelName = '/data/OpportunityChangeEvent';
    @api recordId;
    subscription = {};

    // Initializes the component
    connectedCallback() {
        this.handleSubscribe();
        // Register error listener
        this.registerErrorListener();
    }

    // Handles subscribe button click
    handleSubscribe() {
        // Callback invoked whenever a new event message is received
        const messageCallback = (response) => {
            console.log('New message received: ', JSON.stringify(response));
            this.handleChnageEventResponse(response);
            // Response contains the payload of the new message received
        };

        // Invoke subscribe method of empApi. Pass reference to messageCallback
        subscribe(this.channelName, -1, messageCallback).then((response) => {
            // Response contains the subscription information on subscribe call
            console.log(
                'Subscription request sent to: ',
                JSON.stringify(response.channel)
            );
            this.subscription = response;
        });
    }

    disconnectedCallback() {
        this.handleUnsubscribe();
    }

    // Handles unsubscribe button click
    handleUnsubscribe() {
        // Invoke unsubscribe method of empApi
        unsubscribe(this.subscription, (response) => {
            console.log('unsubscribe() response: ', JSON.stringify(response));
            // Response is true for successful unsubscribe
        });
    }

    registerErrorListener() {
        // Invoke onError empApi method
        onError((error) => {
            console.log('Received error from server: ', JSON.stringify(error));
            // Error contains the server-side error
        });
    }

    handleChnageEventResponse(response) {
        console.log(response);
        if (response.hasOwnProperty("data")) {
            let objData = response.data;
            if (objData.hasOwnProperty("payload")) {
                let payLoadData = response.data.payload;
                const isRecordFound = payLoadData.ChangeEventHeader.recordIds.find((currentItem) => currentItem === this.recordId);
                if (isRecordFound != undefined) {
                    this.isShowAlert = true;
                }
            }
        }
    }

    async refreshHandler() {
        await notifyRecordUpdateAvailable([{ recordId: this.recordId }]);
        this.isShowAlert = false;
    }
}