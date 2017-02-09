// GLOBAL APP CONTROLLER
var appController = (function(budgetCom, UICom) {

    var setupEventListeners = function() {
        
        var DOM = UICom.getDOMStrings();
        
        //event listiner
        $(DOM.inputBtn).on('click', ctrlAddItem);

        //the key press happens on the global event not just on the click.
        document.addEventListener('keypress', function(event) {   
            if(event.keyCode === 13 || event.which === 13){
                console.log(event);
                
                ctrlAddItem();
            }
        });

        $(DOM.container).on('click', ctrlDeleteItem);

        $(DOM.inputType).on('change', UICom.changedType)

    }

    var updateBudget = function() {
        //5.1. Calculate the budget
        budgetCom.calculateBudget();

        //5.2. Return the budget
        var budget = budgetCom.getBudget();

        //5.3. Display the budget on the UI.
        UICom.displayBudget(budget);
    }

    var updatePercentages = function(){
        
        //1. calculate the percetages
        budgetCom.calculatePercentages();

        //2. read from the budget controller
        var percentages = budgetCom.getPercentages();

        //3. update the UI with the new percentages.     
        UIComponent.displayPercentages(percentages);
    }

    var ctrlAddItem = function() {
        var input, newItem;

        //1. Get the field input data from the UI.
        input = UICom.getInput();

        if(input.description !== "" || !isNan(input.value) && input.value > 0){
            //2. Add the item to the budget controller.
            newItem = budgetCom.addItem(input.type, input.description, input.value);

            //3. Add the item to the UI
            UICom.addListItem(newItem, input.type);

            //4. Clear the fields
            UICom.clearFields();

            //5. Call update the budget
            updateBudget();

            //6. Calculate and update the percentages
            updatePercentages();

        }

    };

    var ctrlDeleteItem = function(event) {
        //we need the event because we need to know what the target element is
        var itemID, splitID, type, ID;
        //move up 4 times to the parent node - income-x - get the id
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;  //ion-ios-close-outline when clicked on the cross
        //DOM transfersing. 
        
        if(itemID){

            splitID = itemID.toString().split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);

            // 1. Delete the item from the data struct
            budgetCom.deleteItem(type, ID);

            // 2. Delete the item from the the user interface
            UICom.deleteListItem(itemID);

            // 3. Update and show the new budget. 
            updateBudget();
        }

    };

    // public
    var init = function() {
            console.log('Application has started.');

            // Load JQuery.
            $("document").ready(function() {});
            
            // Get and display the date.
            UICom.displayMonth();
            
            // Reset the budget.
            UICom.displayBudget({
                budget: 0,
                totalIncome : 0,
                totalExpenses : 0,
                percentage : -1
            });

            // Init the event listeners.
            setupEventListeners();
    };

    return {
        init : init
    };

})(budegetComponent, UIComponent);