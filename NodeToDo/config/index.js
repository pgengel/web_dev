var configValues = require('./config'); 

module.exports = {
    //  mongodb://<dbuser>:<dbpassword>@ds047030.mlab.com:47030/nodetodosample
    getDbConnectionString : () => {
        return 'mongodb://' + 
        configValues.username + ':' +
        configValues.password + 
        '@ds047030.mlab.com:47030/nodetodosample';
    }
}