var Todos = require('../models/todoModel');

module.exports = (app) => {
    app.get('/api/setupTodos', (req, res) => {
        
        //seed the database
        var starterTodos = [
            {
                username        : 'test',
                todo            : 'milk',
                isDone          : false,
                hasAttachment   : false
            },
            {
                username        : 'test',
                todo            : 'bread',
                isDone          : true,
                hasAttachment   : true
            },
        ];
        Todos.create(starterTodos, (err, results) => {
            res.send(results);
        });
    });
}