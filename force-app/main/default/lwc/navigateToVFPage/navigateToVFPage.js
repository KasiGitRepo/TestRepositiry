/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-16-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation'
export default class NavigateToVFPage extends NavigationMixin(LightningElement) {

    handleVFPage() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                //We pass the VF page through below Url
                url:"/apex/navigateVFPage"
            }
            // We can directly navigate into VF page through Promise object
        }).then(generatedUrl => {
            // We will open a window with url
            window.open(generatedUrl, "_blank")
        })
    }
}