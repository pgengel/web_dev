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

    var calculateTotal = function(type) {
        var sum = 0;
        data.allitems[type].forEach(function(cur) {
            sum = sum + cur.value;
        });

        data.totals[type] = sum;
    }

    var data = {
        allitems : {
            exp : [],  //[var Expense]
            inc : [],  //[var Income]
        },
        totals : {
            exp : 0,  
            inc : 0, 
        },
        budget : 0,
        percentage : -1

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

        deleteItem : function(type, id) {
            var ids, index;

            //This does not work.
            ids = (data.allitems[type]).map(function(current) {
                return current.id;
            });

            index = ids.indexOf(id);

            if(index !== -1){
                data.allitems[type].splice(index, 1);
            }
        },

        calculateBudget : function() {
            // calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');

            //calculate the budget: income  - expenses
            data.budget = data.totals.inc - data.totals.exp;

            //calculate the percentage of the the income that we spent.
            if(data.totals.inc > 0){
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else{
                data.percentage = -1;
            }
            

        },

        getBudget : function() {
            return {
                budget: data.budget,
                totaIncome: data.totals.inc,
                totalExpenses: data.totals.exp,
                percentage : data.percentage
            }    
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
        incomeContainer : '.income__list',
        expenseContainer : '.expenses__list',
        budgetLabel : '.budget__value',
        budgetIncomeLabel : '.budget__income--value',
        budgetExpenseLabel: '.budget__expenses--value',
        budgetPercentageLabel: '.budget__expenses--percentage',
        container : '.container',
    };

    return {

        // get the inputs from the UI
        getInput: function() {                 
            return {
                //return an object with these 3 things
                type : document.querySelector(DOMStrings.inputType).value,// Will be either inc or exp
                desciption : document.querySelector(DOMStrings.inputDescription).value,
                value : parseFloat(document.querySelector(DOMStrings.inputValue).value),
            };
        },

        addListItem: function(obj, type) {
            var html, newHtml, element;
            
            if(type === 'inc'){
                element = DOMStrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%discription%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            
            if(type === 'exp'){
                element = DOMStrings.expenseContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%discription%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            // create html strings with placeholder tags
    
           
            // replace placeholder tags with with actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%discription%', obj.desciption);
            newHtml = newHtml.replace('%value%', obj.value);

            // insert the HTML into the DOM.
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        clearFields: function() {
            var fields, fieldsArr;
            fields = document.querySelectorAll(DOMStrings.inputDescription +', ' + DOMStrings.inputValue);

            fieldsArr = Array.prototype.slice.call(fields);   

            fieldsArr.forEach(function(curr, index, array) {
                curr.value = "";    
            });

            //set focus on 1st element which is the desc.
            fieldsArr[0].focus();
        },

        displayBudget : function(obj) {
            document.querySelector(DOMStrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMStrings.budgetIncomeLabel).textContent = obj.totaIncome;
            document.querySelector(DOMStrings.budgetExpenseLabel).textContent = obj.totalExpenses;
           
            if(obj.percentage > 0){
                document.querySelector(DOMStrings.budgetPercentageLabel).textContent = obj.percentage + '%';
            } else{
                 document.querySelector(DOMStrings.budgetPercentageLabel).textContent = "---";
            }

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

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
    }

    var updateBudget = function() {
        //5.1. Calculate the budget
        budgetCtrl.calculateBudget();

        //5.2. Return the budget
        var budget = budgetCtrl.getBudget();

        //5.3. Display the budget on the UI.
        UICtrl.displayBudget(budget);
    }

    var ctrlAddItem = function() {
        var input, newItem;

        //1. Get the field input data from the UI.
        input = UICtrl.getInput();

        if(input.desciption !== "" || !isNan(input.value) && input.value > 0){
            //2. Add the item to the budget controller.
            newItem = budgetCtrl.addItem(input.type, input.desciption, input.value);

            //3. Add the item to the UI
            UICtrl.addListItem(newItem, input.type);

            //4. Clear the fields
            UICtrl.clearFields();

            //5. Call update the budget
            updateBudget();

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
            budgetCtrl.deleteItem(type, ID);

            // 2. Delete the item from the the user interface
            // 3. Update and show the new budget. 
        }

    };

    return {
        init : function() {
            console.log('Application has started.');
            UICtrl.displayBudget({
                budget: 0,
                totalExpenses : 0,
                totalExpenses : 0,
                percentage : -1
            });
            setupEventListeners();
        }
    };

})(budegetController, UIController);

controller.init();