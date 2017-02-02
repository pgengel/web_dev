//module pattern - we create IIFE to create a new scope - x and add function is not available from the console.

//BUDGET CONTROLLER
var budegetController = (function() {
    

    return {

    };

})();

//UI CONTROLLER
var UIController = (function() {
    
    var DOMStrings = {
        inputType : '.add__type',
        inputDescription : '.add__description',
        inputValue : '.add__value',
        inputBtn : '.add__btn',
    };

    return {

        // get the inputs from the UI
        getInput: function() {                 
            return {
                //return an object with these 3 things
                type : document.querySelector(DOMStrings.inputType).value,// Will be either inc or exp
                desciption : document.querySelector(DOMStrings.inputDescription).value,
                value : document.querySelector(DOMStrings.inputValue).value,
            };
        },

        getDOMStrings : function() {
            return DOMStrings;
        },

    };

})();

// GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {

    var DOM = UICtrl.getDOMStrings();

    var ctrlAddItem = function() {
        
        console.log("Enter has been pressed.");

        //1. Get the field input data from the UI.
        var input = UICtrl.getInput();
        console.log(input);

        //2. Add the item to the budget controller.

        //3. Add the item to the UI

        //4. Calculate the budget

        //5. Display the budget on the UI.


    }

    //event listiner
    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    //the key press happens on the global event not just on the click.
    document.addEventListener('keypress', function(event) {
        

        if(event.keyCode === 13 || event.which === 13){
            console.log(event);
            
            ctrlAddItem();
        }

    });

})(budegetController, UIController);