/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 12-25-2023
 * @last modified by  : Kasi Jangiti
**/
//Import the Lightning datatable
import LightningDataTable from 'lightning/datatable';
//Import thr templates(Custom data types)
import customNameTemplate from "./customName.html";
import customRankTemplate from "./customRank.html";
import customImageTemplate from "./customImage.html";

//It should extend with LightningDataTable instead LightningElement 
export default class CustomDataType extends LightningDataTable {

    //Define Custom data types
    static customTypes = {
        //Lightning-badge data type
        contactNameType: {
            template: customNameTemplate,
            standardCellLayout: true,
            typeAttributes: ["contactName"]
        },

        //lightning-icon
        contactRankType: {
            template: customRankTemplate,
            standardCellLayout: false,
            typeAttributes: ["contactRank"]
        },

        //image data type
        contactImageType: {
            template: customImageTemplate,
            standardCellLayout: true,
            typeAttributes: ["contactPicture"]
        }
    };
}