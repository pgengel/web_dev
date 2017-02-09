
    //module pattern - we create IIFE to create a new scope - x and add function is not available from the console.

    //BUDGET CONTROLLER
    var budegetController = (function() {

        // Expense function constrcutor.
        var Expense = function(id, description, value) {
            this.id = id;
            this.description = description;
            this.value = value;
            this.percentage = -1;
        };   

        Expense.prototype.calcPercentage = function(totalIncome) {
            if(totalIncome > 0){
                this.percentage = Math.round((this.value / totalIncome) * 100); 
            } else{
                this.percentage = -1;
            }
        };  

        Expense.prototype.getPercentage = function() {
            return this.percentage;
        };

        // Income function constrcutor.
        var Income = function (id, description, value) {
            this.id = id;
            this.description = description;
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

            calculatePercentages: function() {
                data.allitems.exp.forEach(function(cur) {
                    cur.calcPercentage(data.totals.inc);
                });
            },

            getPercentages : function() {
                var allPerc = data.allitems.exp.map(function(cur){
                    return cur.getPercentage();
                });

                return allPerc;
            },

            getBudget : function() {
                return {
                    budget: data.budget,
                    totalIncome: data.totals.inc,
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
            expensesPercentageLabel : '.item__percentage',
            dateLabel : '.budget__title--month',
        };

        var formatNumber = function(num, type) {
            // + - before a number, exactly 2 dec points, comma seperate the thousands.
            num = Math.abs(num);

            // fix the numbers to 2 dec.
            num = num.toFixed(2);

            numSplit = num.split('.');

            int = numSplit[0];
            if(int.length > 3){
                int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
            }

            dec = numSplit[1];

            return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;

        };

        var nodeListForEach = function(list, callback){
            for(var i = 0; i< list.length; i++){
            callback(list[i], i);
            }
        };

        // Public method
        var getInput = function() {                 
            return {
                //return an object with these 3 things
                type : $(DOMStrings.inputType).val(),// Will be either inc or exp
                description : $(DOMStrings.inputDescription).val(),
                value : parseFloat($(DOMStrings.inputValue).val()),
            };
        };

        // Public method
        var addListItem = function(obj, type) {
            var html, newHtml, element;
            
            if(type === 'inc'){
                element = DOMStrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            
            if(type === 'exp'){
                element = DOMStrings.expenseContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            // create html strings with placeholder tags
    
        
            // replace placeholder tags with with actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

            // insert the HTML into the DOM.
            $(element).append(newHtml);
        };

        // Public method
        var deleteListItem = function(selectorID) {
            var el = $("#" + selectorID);
            el.remove();
            //document.getElementById(selectorID).parentNode.removeChild()    
        };

        // Public method
        var clearFields = function() {
            var fields, fieldsArr;
            fields = $(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue);

            fieldsArr = Array.prototype.slice.call(fields);   

            fieldsArr.forEach(function(curr, index, array) {
                curr.value = "";    
            });

            //set focus on 1st element which is the desc.
            fieldsArr[0].focus();
        };

        // Public method
        var displayBudget = function(obj) {
            var type;

            obj.budget > 0 ? type = 'inc' : type = 'exp';

            $(DOMStrings.budgetLabel).text(formatNumber(obj.budget, type));
            $(DOMStrings.budgetIncomeLabel).text(formatNumber(obj.totalIncome, 'inc'));
            $(DOMStrings.budgetExpenseLabel).text(formatNumber(obj.totalExpenses, 'exp'));
        
            if(obj.percentage > 0){
                $(DOMStrings.budgetPercentageLabel).text(obj.percentage + '%');
            } else{
                $(DOMStrings.budgetPercentageLabel).text("---");
            }
        };

        // Public method
        var displayPercentages = function(percentages) {
            //we do not know how many item__perctages there will be. Select them all. 

            //this will return nodelist - loop through the nodes
            var fields = $(DOMStrings.expensesPercentageLabel);

            nodeListForEach(fields, function(current, index){
                if(percentages[index] > 0){
                    current.textContent = percentages[index] + '%';
                } else{
                    current.textContent = '---';
                }               
            });

        };

        // Public method
        var displayMonth = function() {
            var now, year, month;
            now = new Date(); //return todays date.
            months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov', 'Dec']
            year = now.getFullYear();
            month = now.getMonth();
            $(DOMStrings.dateLabel).text(months[month] + ' ' + year);
        };

        var getDOMStrings = function() {
            return DOMStrings;
        };

        // Public method
        var changedType = function() {
            // The best way to change styles is to change the html.
            var fields = $(
                DOMStrings.inputType + ',' + 
                DOMStrings.inputDescription + ',' +
                DOMStrings.inputValue);

            nodeListForEach(fields, function(cur) {
                cur.classList.toggle('red-focus');
            });

            $(DOMStrings.inputBtn).toggleClass('red');
        }; 

        // Public method
        var addListItem = function(obj, type) {
            var html, newHtml, element;
            
            if(type === 'inc'){
                element = DOMStrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            
            if(type === 'exp'){
                element = DOMStrings.expenseContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            // create html strings with placeholder tags
    
        
            // replace placeholder tags with with actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

            // insert the HTML into the DOM.
            $(element).append(newHtml);
        };

        return {

            // get the inputs from the UI
            getInput: getInput,
            deleteListItem : deleteListItem,
            clearFields : clearFields,
            displayBudget : displayBudget,
            displayPercentages : displayPercentages,
            displayMonth : displayMonth,
            getDOMStrings : getDOMStrings,
            changedType : changedType,
            addListItem : addListItem,

        };

    })();

    // GLOBAL APP CONTROLLER
    var controller = (function(budgetCtrl, UICtrl) {

        var setupEventListeners = function() {
            
            var DOM = UICtrl.getDOMStrings();
            
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

            $(DOM.inputType).on('change', UICtrl.changedType)

        }

        var updateBudget = function() {
            //5.1. Calculate the budget
            budgetCtrl.calculateBudget();

            //5.2. Return the budget
            var budget = budgetCtrl.getBudget();

            //5.3. Display the budget on the UI.
            UICtrl.displayBudget(budget);
        }

        var updatePercentages = function(){
            
            //1. calculate the percetages
            budgetCtrl.calculatePercentages();

            //2. read from the budget controller
            var percentages = budgetCtrl.getPercentages();

            //3. update the UI with the new percentages.     
            UIController.displayPercentages(percentages);
        }

        var ctrlAddItem = function() {
            var input, newItem;

            //1. Get the field input data from the UI.
            input = UICtrl.getInput();

            if(input.description !== "" || !isNan(input.value) && input.value > 0){
                //2. Add the item to the budget controller.
                newItem = budgetCtrl.addItem(input.type, input.description, input.value);

                //3. Add the item to the UI
                UICtrl.addListItem(newItem, input.type);

                //4. Clear the fields
                UICtrl.clearFields();

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
                budgetCtrl.deleteItem(type, ID);

                // 2. Delete the item from the the user interface
                UICtrl.deleteListItem(itemID);

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
                UICtrl.displayMonth();
                
                // Reset the budget.
                UICtrl.displayBudget({
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

    })(budegetController, UIController);

    controller.init();


   
