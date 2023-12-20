/**
 * @description       : 
 * @author            : Kasi Jangiti
 * @group             : 
 * @last modified on  : 08-15-2023
 * @last modified by  : Kasi Jangiti
**/
({
    // subscribe the published message
    handleMessage : function(component, message) {
      if(message != null && message.getParam("lmsDatapass") !=null){
          //Set the published message to the attribute(variable) to display on UI
          component.set("v.recieveMessage", message.getParam("lmsDatapass").value);
      }
    },

    //Store the input field value and assigned it to the attribute(variable)
    handleInput: function(component,event){
        console.log('Input Message :'+ event.target.value);
        component.set("v.inputMessage", event.target.value);
    },

    //Publish the message
    publishHandler:function(component){
        let msg = component.get("v.inputMessage");
        //Pass the input field value as message to publish
        let message = {
            lmsDatapass:{
                value:msg
            }
        }
          //Publish the message by referecne of aura:id with publish method
          component.find("messageChannel").publish(message);
    }
})
