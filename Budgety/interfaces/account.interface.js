var accountInterface = (function() {
    
    var AccountInterface = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;      
    };

    return {AccountInterface : AccountInterface}
    
})();