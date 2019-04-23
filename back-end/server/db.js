const mongoose = require('mongoose');

module.exports = () => {
    function connect() {
        mongoose.connect('mongodb://localhost:27017/hoant', { useNewUrlParser: true })
            .then(() => console.log('mongodb connected'))
            .catch((err) => console.error('mongodb connection error', err));
    }

    connect();
    mongoose.connection.on('disconnected', connect);
    require('./models/schema/movie.js');
};