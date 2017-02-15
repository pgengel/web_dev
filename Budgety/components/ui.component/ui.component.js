//UI COMPONENT
var UIComponent = (function(DOMstr) {
    
    // Dependancy inject the dom strings.
    var DOMStrings = DOMstr.indexStrings;

    var formatNumber = function(num, type) {
        // + - before a number, exactly 2 dec points, comma seperate the thousands.
        num = Math.abs(num);

        // fix the numbers to 2 dec.
        num = num.toFixed(2);

        var numSplit = num.split('.');

        var int = numSplit[0];
        if(int.length > 3){
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
        }

        var dec = numSplit[1];

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
        // create html strings with placeholder tag
    
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
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov', 'Dec'];
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

})(DOM);