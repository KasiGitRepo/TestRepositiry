/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 12-15-2023
 * @last modified by  : Kasi Jangiti
**/
import LightningDataTable from 'lightning/datatable';
import customNameTemplate from "./customName.html";
import customRankTemplate from "./customRank.html";
import customImageTemplate from "./customImage.html";

export default class CustomDataType extends LightningDataTable {

    static customTypes = {
        contactNameType: {
            template: customNameTemplate,
            standardCellLayout: true,
            typeAttributes: ["contactName"]
        },
        contactRankType: {
            template: customRankTemplate,
            standardCellLayout: false,
            typeAttributes: ["contactRank"]
        },
        contactImageType: {
            template: customImageTemplate,
            standardCellLayout: true,
            typeAttributes: ["contactPicture"]
        }
    };
}