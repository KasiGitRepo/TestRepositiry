/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-05-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement} from 'lwc';

export default class P2cParent extends LightningElement {

    childData = [
        {
            src: "https://www.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg",
            header: "First Card",
            description: "First card description."
        },
        {
            src: "https://www.lightningdesignsystem.com/assets/images/carousel/carousel-02.jpg",
            header: "Second Card",
            description: "Second card description."
        },
        {
            src: "https://www.lightningdesignsystem.com/assets/images/carousel/carousel-03.jpg",
            header: "Third Card",
            description: "Second card description."
        },
        {
            src: "https://www.lightningdesignsystem.com/assets/images/carousel/carousel-04.jpg",
            header: "Fourth Card",
            description: "Fourth card description."
        }
    ]

    percentage

    changeHandler(event){
       this.percentage = event.target.value
    }

    handleClick(event){
        this.template.querySelector('c-p2c-slider-component').resetSlider()
    }
}