var expenseComponent = (function(IAccount) {

    var Expenses = IAccount.AccountInterface;

    Expenses.prototype.calcPercentage = function(totalIncome) {
        if(totalIncome > 0){
            this.percentage = Math.round((this.value / totalIncome) * 100); 
        } else{
            this.percentage = -1;
        }
    };  

    Expenses.prototype.getPercentage = function() {
        return this.percentage;
    };

    return {Expenses : Expenses}

})(accountInterface);