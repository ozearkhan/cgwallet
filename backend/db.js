
const mongoose = require('mongoose');
const {db_key} =require('./config');
mongoose.connect(db_key);


const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength:50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength:50
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
})

const accountSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId, // ref to the User Model
        ref: 'User',
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    }
})

const User = mongoose.model('User',userSchema);
const Account = mongoose.model('Account',accountSchema);

module.exports = {
    User,
    Account
}