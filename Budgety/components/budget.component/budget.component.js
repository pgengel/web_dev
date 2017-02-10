//BUDGET COMPONENT
var budegetComponent = (function(budgetMdl, incomeCom, expenseCom) {
    
    // Dependancy inject the budgetModel
    var Budget = budgetMdl.data;

    // Dependancy inject the Expense function constrcutor.
    var Expense = expenseCom.Expenses;

    // Dependancy inject the Income function constrcutor.
    var Income = incomeCom.Incomes;   

    var calculateTotal = function(type) {
        var sum = 0;
        Budget.allitems[type].forEach(function(cur) {
            sum = sum + cur.value;
        });

        Budget.totals[type] = sum;
    }

    // Public method
    var addItem = function(type, des, val) {
        var newItem, ID;
        
        //create new ID
        if(Budget.allitems[type].length > 0){
            ID = Budget.allitems[type][Budget.allitems[type].length - 1].id + 1;
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
        
        // Push in into our Budget struct
        Budget.allitems[type].push(newItem);

        //return new Item
        return newItem;
    };

    var deleteItem = function(type, id) {
        var ids, index;

        //This does not work.
        ids = (Budget.allitems[type]).map(function(current) {
            return current.id;
        });

        index = ids.indexOf(id);

        if(index !== -1){
            Budget.allitems[type].splice(index, 1);
        }
    };

    var calculateBudget = function() {
        // calculate total income and expenses
        calculateTotal('exp');
        calculateTotal('inc');

        //calculate the budget: income  - expenses
        Budget.budget = Budget.totals.inc - Budget.totals.exp;

        //calculate the percentage of the the income that we spent.
        if(Budget.totals.inc > 0){
            Budget.percentage = Math.round((Budget.totals.exp / Budget.totals.inc) * 100);
        } else{
            Budget.percentage = -1;
        }        

    };

    var calculatePercentages = function() {
        Budget.allitems.exp.forEach(function(cur) {
            cur.calcPercentage(Budget.totals.inc);
        });
    };

    var getPercentages = function() {
        var allPerc = Budget.allitems.exp.map(function(cur){
            return cur.getPercentage();
        });

        return allPerc;
    };

    var getBudget = function() {
        return {
            budget: Budget.budget,
            totalIncome: Budget.totals.inc,
            totalExpenses: Budget.totals.exp,
            percentage : Budget.percentage
        }    
    };

    return {
        addItem :  addItem,
        deleteItem : deleteItem,
        calculateBudget : calculateBudget,
        calculatePercentages: calculatePercentages,
        getPercentages : getPercentages,
        getBudget : getBudget,
    };

})(budgetModel, incomeComponent, expenseComponent);