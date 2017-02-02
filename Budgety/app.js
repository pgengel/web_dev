//module pattern - we create IIFE to create a new scope - x and add function is not available from the console.

//BUDGET CONTROLLER
var budegetController = (function() {

    // functions constrcutor.
    var Expense = function(id, desciption, value) {
        this.id = id;
        this.desciption = desciption;
        this.value = value;
    };     

    // functions constrcutor.
    var Income = function(id, desciption, value) {
        this.id = id;
        this.desciption = desciption;
        this.value = value;
    };   

    var data = {
        allitems : {
            exp : [],  
            inc : [], 
        },
        totals : {
            exp : 0,  
            inc : 0, 
        },

    }

 

    return {
        addItem :  function(type, des, val) {
            var newItem, ID;
            
            //create new ID
            if(data.allitems[type].length > 0){
                ID = data.allitems[type][data.allitems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            
            //create new  inc
            if(type === 'inc'){
                newItem = new Income(ID, des, val); 
            }

            if(type === 'exp'){
                newItem = new Expense(ID, des, val); 
            }
              
            // Push in into our data struct
            data.allitems[type].push(newItem);

            //return new Item
            return newItem;
        },

        testing : function() {
            console.log(data);
        }
    };

})();

//UI CONTROLLER
var UIController = (function() {
    
    //List of the DOM elements that will serve as constants
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

    var setupEventListeners = function() {
        
        var DOM = UICtrl.getDOMStrings();
        
        //event listiner
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        //the key press happens on the global event not just on the click.
        document.addEventListener('keypress', function(event) {   
            if(event.keyCode === 13 || event.which === 13){
                console.log(event);
                
                ctrlAddItem();
            }
        });
    }

    var ctrlAddItem = function() {
        var input, newItem;
        console.log("Enter has been pressed.");

        //1. Get the field input data from the UI.
        input = UICtrl.getInput();
        console.log(input);

        //2. Add the item to the budget controller.
        newItem = budgetCtrl.addItem(input.type, input.desciption, input.value);

        //3. Add the item to the UI

        //4. Calculate the budget

        //5. Display the budget on the UI.


    }

    return {
        init : function() {
            console.log('Application has started.');
            setupEventListeners();
        }
    };

})(budegetController, UIController);

controller.init();