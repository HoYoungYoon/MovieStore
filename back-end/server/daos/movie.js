module.exports = (function(){
    const model = require('../models/model');

    async function getAllMovies(){
        return await model.Movie.find();
    }

    return {
        getAllMovies: getAllMovies,
    };

})();