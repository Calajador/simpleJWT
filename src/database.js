const mongoose = require('mongoose');
const URI = 'mongodb://localhost/simplejwt';

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    
}).then(db => console.log('Database Connected'))
  .catch(err => console.log(err));