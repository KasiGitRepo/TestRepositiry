/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-22-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement , wire, api} from 'lwc';
import { getRecordUi } from 'lightning/uiRecordApi';
export default class GetRecordUIData extends LightningElement {

    @api recordId

    //Fields which we want to display on UI
    formFields = [
        {"label":"Account Name", "fieldName": "Name"},
        {"label":"Account Industry", "fieldName": "Industry"},
        {"label":"Account Phone", "fieldName": "Phone"},
        {"label":"Account Type", "fieldName": "Type"},
        {"label":"Annual Revenue ", "fieldName": "AnnualRevenue"}
    ]

  @wire(getRecordUi, { recordIds:'$recordId', layoutTypes:['Full'], modes:['View']})
  handleRecordData({data, error}){
      if(data){
       // console.log(data)

        //Iterate the fields in the form of Map
        this.formFields = this.formFields.map(item=>{
          //value:data.records[this.recordId]=> Go to the recordId
          //fields[item.fieldName].value => Get the value based on the fieldName
           return {...item, value:data.records[this.recordId].fields[item.fieldName].value}
        })
      }
      if(error){
      //  console.error(error)
      }
   }
}