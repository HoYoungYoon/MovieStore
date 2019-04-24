module.exports = (function(){
    const model = require('../models/model');

    async function getAllMovies(){
        return await model.Movie.find();
    }

    async function getMovie(kor_title){
        return await model.Movie.findOne({kor_title: {$regex : kor_title}}); // 없을땐 null, 부분 일치
      }
    

    return {
        getAllMovies: getAllMovies,
        getMovie: getMovie
    };

})();