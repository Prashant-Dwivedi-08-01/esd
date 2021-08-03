import mongoose from "mongoose";

const officerSchema = mongoose.Schema({
    officer_id: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        require: true
    }
})

const Officer = mongoose.model("Officer", officerSchema);

export default Officer;