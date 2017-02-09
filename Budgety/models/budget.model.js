var budgetModel = (function() {
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

    return {data : data}

})();