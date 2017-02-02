//module pattern - we create IIFE to create a new scope - x and add function is not available from the console.

//BUDGET CONTROLLER
var budegetController = (function() {
    

    return {

    }

})();

//UI CONTROLLER
var UIController = (function() {
    //

    return{

    }

})();

// GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {

    var ctrlAddItem = function() {
        
        console.log("Enter has been pressed.");

        //1. Get the field input data

        //2. Add the item to the budget controller.

        //3. Add the item to the UI

        //4. Calculate the budget

        //5. Display the budget on the UI.


    }

    //event listiner
    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

    //the key press happens on the global event not just on the click.
    document.addEventListener('keypress', function(event) {
        

        if(event.keyCode === 13 || event.which === 13){
            console.log(event);
            
            ctrlAddItem();
        }

    });

})(budegetController, UIController);