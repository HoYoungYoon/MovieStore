module.exports = (function(){
    const mongoose = require('mongoose');

    const schema = {};
    const model = {};

    schema.Movie = require('./schema/movie')(mongoose);

    for(let k in schema){
        model[k] = mongoose.model(k, schema[k]);
    }

    return model;
})();