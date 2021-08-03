import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    pincode: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    meterNumber: {
        type: String
    },
    
    password: {
        type: String,
        required: true
    },
})

const User = mongoose.model('User', userSchema);

export default User;