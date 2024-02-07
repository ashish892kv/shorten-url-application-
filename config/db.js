const mongoose = require('mongoose');

module.exports = async () => {
    try {
        await mongoose.connect(process.env.MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('conneted to mongoDB');
    } catch (err) {
        console.error("could not connet to mongoDB");
        process.exit(1);
    }
}