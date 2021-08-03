import mongoose from 'mongoose';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const dataSchema = mongoose.Schema({
    meterNumber: {
        type: String,
        required: true
    },

    billingUnit:{
        type: Number
    },

    amount: {
        type: Number
    },
    
    status:{
        type: String
    },
    
    month: {
        type: String,
        default: monthNames[new Date().getMonth()]
    }
})

dataSchema.index({meterNumber: 1, month: 1}, {unique: true});

const Data = mongoose.model('Data', dataSchema);

export default Data;