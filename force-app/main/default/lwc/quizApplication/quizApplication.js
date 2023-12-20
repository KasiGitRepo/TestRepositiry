/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-03-2023
 * @last modified by  : Kasi Jangiti
**/
import { LightningElement } from 'lwc';

export default class QuizApplication extends LightningElement {

    selected={}
    isSubmitted = false
    correctAnswers=0
    myQuestions=[
        {
            id:"Question-1",
            question:"Which is the capital of Andhra Pradesh?",
            answers:{
                a:"Amaravathi",
                b:"Vizag",
                c:"Kurnool"
            },
            correctAnswer:"a"
        },
        {
            id:"Question-2",
            question:"Which is the capital of India?",
            answers:{
                a:"Delhi",
                b:"Bangalore",
                c:"Guntur"
            },
            correctAnswer:"a"
        },
        {
            id:"Question-3",
            question:"Which is the headquarters of Palnadu disttict?",
            answers:{
                a:"Macherla",
                b:"Guntur",
                c:"Narsaraopet"
            },
            correctAnswer:"c"
        }
    ]

    //Store the selected values
    changeHandler(event){
        console.log("name", event.target.name)
        console.log("value", event.target.value)
        const {name, value} = event.target
        this.selected = {...this.selected, [name]:value}
    }

   //Show the Submit button based on Condition
   get notAllOptions(){
     return !(Object.keys(this.selected).length === this.myQuestions.length)
    }

    //Apply the text color based on no of answers correct
    get isFullCorrect(){
        return `slds-text-heading_large ${this.myQuestions.length === this.correctAnswers ?
        'slds-text-color_success':'slds-text-color_error'}`
    }

    //Submit button invoked
    submitHandler(event){     
        event.preventDefault()
        let correct = this.myQuestions.filter(item=>this.selected[item.id] === item.correctAnswer)
        this.correctAnswers = correct.length
        this.isSubmitted = true 
        console.log("Submit button invoked")
    }

    resetHandler(){
        this.selected={}
        this.correctAnswers=0
        this.isSubmitted=false
    }
}