//BUDGET COMPONENT
var budegetComponent = (function(budgetMdl) {

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
        budgetMdl.data.allitems[type].forEach(function(cur) {
            sum = sum + cur.value;
        });

        budgetMdl.data.totals[type] = sum;
    }

    // Public method
    var addItem = function(type, des, val) {
        var newItem, ID;
        
        //create new ID
        if(budgetMdl.data.allitems[type].length > 0){
            ID = budgetMdl.data.allitems[type][budgetMdl.data.allitems[type].length - 1].id + 1;
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
        
        // Push in into our budgetMdl.data struct
        budgetMdl.data.allitems[type].push(newItem);

        //return new Item
        return newItem;
    };

    var deleteItem = function(type, id) {
        var ids, index;

        //This does not work.
        ids = (budgetMdl.data.allitems[type]).map(function(current) {
            return current.id;
        });

        index = ids.indexOf(id);

        if(index !== -1){
            budgetMdl.data.allitems[type].splice(index, 1);
        }
    };

    var calculateBudget = function() {
        // calculate total income and expenses
        calculateTotal('exp');
        calculateTotal('inc');

        //calculate the budget: income  - expenses
        budgetMdl.data.budget = budgetMdl.data.totals.inc - budgetMdl.data.totals.exp;

        //calculate the percentage of the the income that we spent.
        if(budgetMdl.data.totals.inc > 0){
            budgetMdl.data.percentage = Math.round((budgetMdl.data.totals.exp / budgetMdl.data.totals.inc) * 100);
        } else{
            budgetMdl.data.percentage = -1;
        }        

    };

    var calculatePercentages = function() {
        budgetMdl.data.allitems.exp.forEach(function(cur) {
            cur.calcPercentage(budgetMdl.data.totals.inc);
        });
    };

    var getPercentages = function() {
        var allPerc = budgetMdl.data.allitems.exp.map(function(cur){
            return cur.getPercentage();
        });

        return allPerc;
    };

    var getBudget = function() {
        return {
            budget: budgetMdl.data.budget,
            totalIncome: budgetMdl.data.totals.inc,
            totalExpenses: budgetMdl.data.totals.exp,
            percentage : budgetMdl.data.percentage
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

})(budgetModel);